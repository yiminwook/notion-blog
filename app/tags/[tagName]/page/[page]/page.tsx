import { ITEMS_PER_PAGE, NOTION_DATABASE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import { getDatabaseItems } from '@/models/notionClient';
import { getAllTags } from '@/utils/getAllTags';
import { getENV } from '@/utils/getENV';
import getPaginationRange from '@/utils/getPaginationRange';
import { parseDatabaseItems, pascalTagName } from '@/utils/parseDatabaseItems';
import { insertPreviewImage } from '@/utils/makePreviewImage';
import { GetDatabaseByTagNameReturnType } from '@/app/tags/[tagName]/page';
import TagsHeroSection from '@/components/tags/HeroSection';
import CardSection from '@/components/intro/CardSection';

interface TagsWithPageParams {
  page: string;
  tagName: string;
}

export const generateStaticParams = async (): Promise<TagsWithPageParams[]> => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const parsedItems = parseDatabaseItems(databaseItems);
  const allTags = getAllTags(databaseItems);

  const paths = allTags.reduce<TagsWithPageParams[]>((acc, { id, name }) => {
    const tagItems = parsedItems.filter(({ tags }) => tags.findIndex((tag) => tag.id === id) > -1);

    const path = Array.from({ length: Math.ceil(tagItems.length / ITEMS_PER_PAGE) }, (_, i) => ({
      tagName: name.toLowerCase(), //ex) nextjs, typescript 모두 소문자
      page: (i + 1).toString(),
    }));

    return [...acc, ...path];
  }, []);

  return paths;
};

const getDatabaseItemsByTagNameWithPage = async ({
  tagName,
  page,
}: TagsWithPageParams): Promise<GetDatabaseByTagNameReturnType> => {
  const pageQuery = Number(page);
  if (Number.isNaN(pageQuery)) throw new Error('PageQuery is not number');
  const databaseId = getENV(NOTION_DATABASE_ID);

  /** TagFilter option */
  const options = {
    filter: { tagName },
  };
  const databaseItems = await getDatabaseItems(databaseId, options);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems.slice(...getPaginationRange(pageQuery)));
  const parsedItemsWithPreview = await insertPreviewImage(parsedDatabaseItems);

  return {
    databaseItems: parsedItemsWithPreview,
    totalLength: databaseItems.length,
  };
};

interface TagsWithPageProps {
  params: TagsWithPageParams;
}

const TagsWithPage = async ({ params: { tagName, page } }: TagsWithPageProps) => {
  const { databaseItems, totalLength } = await getDatabaseItemsByTagNameWithPage({ tagName, page });
  const pasedTagName = pascalTagName(tagName);
  return (
    <div>
      {/* <PageHead title={`#${tagName}`} keywords={tagName} /> */}
      <TagsHeroSection title={`#${pasedTagName}`} />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </div>
  );
};

export default TagsWithPage;
export const revalidate = PAGE_REVALIDATE_TIME;
// fallback: 'blocking',
