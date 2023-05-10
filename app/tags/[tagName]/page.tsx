import { getDatabaseItems } from '@/models/notionClient';
import CardSection from '@/components/intro/CardSection';
import TagsHeroSection from '@/components/tags/HeroSection';
import { getAllTags } from '@/utils/getAllTags';
import { parseDatabaseItems, ParsedDatabaseItemType, pascalTagName } from '@/utils/parseDatabaseItems';
import { ITEMS_PER_PAGE, NOTION_DATABASE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import { getENV } from '@/utils/getENV';
import { insertPreviewImage } from '@/utils/makePreviewImage';
import PageHead from '@/components/layout/PageHead';

interface TagsPageParams {
  tagName: string;
}

export const generateStaticParams = async (): Promise<TagsPageParams[]> => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const allTags = getAllTags(databaseItems);
  const paths = allTags.map(({ name }) => ({
    tagName: name.toLowerCase(),
  }));

  return paths;
};

export interface GetDatabaseByTagNameReturnType {
  databaseItems: ParsedDatabaseItemType[];
  totalLength: number;
}

const getDatabaseByTagName = async (tagName: string): Promise<GetDatabaseByTagNameReturnType> => {
  const databaseId = getENV(NOTION_DATABASE_ID);

  /** TagFilter option */
  const options = {
    filter: { tagName },
  };
  const databaseItems = await getDatabaseItems(databaseId, options);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems.slice(0, ITEMS_PER_PAGE));
  const parsedItemsWithPreviewImage = await insertPreviewImage(parsedDatabaseItems);
  return {
    databaseItems: parsedItemsWithPreviewImage,
    totalLength: databaseItems.length,
  };
};

interface TagsPageProps {
  params: TagsPageParams;
}
const TagsPage = async ({ params: { tagName } }: TagsPageProps) => {
  const { databaseItems, totalLength } = await getDatabaseByTagName(tagName);
  const parsedTagName = pascalTagName(tagName);
  return (
    <div>
      <PageHead title={`#${parsedTagName}`} keywords={tagName} />
      <TagsHeroSection title={`#${tagName}`} />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </div>
  );
};

export default TagsPage;
export const revalidate = PAGE_REVALIDATE_TIME;

// fallback: 'blocking',
