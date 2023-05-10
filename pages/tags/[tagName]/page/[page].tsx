import { ITEMS_PER_PAGE, NOTION_DATABASE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import { getDatabaseItems } from '@/models/notionClient';
import { getAllTags } from '@/utils/getAllTags';
import { getENV } from '@/utils/getENV';
import getPaginationRange from '@/utils/getPaginationRange';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { GetStaticPaths, GetStaticProps } from 'next';
import TagsPage, { TagsPageParams, TagsPageProps } from '@/pages/tags/[tagName]';
import { insertPreviewImage } from '@/utils/makePreviewImage';

const TagsWithPage = (props: TagsPageProps) => {
  return <TagsPage {...props} />;
};

export default TagsWithPage;

export interface TagsWithPageParams extends TagsPageParams {
  page: string;
}

export const getStaticProps: GetStaticProps<TagsPageProps, TagsWithPageParams> = async ({ params }) => {
  /* Params */
  const { tagName, page } = params!;
  const pageQuery = Number(page);
  if (Number.isNaN(pageQuery)) throw new Error('PageQuery is not number');
  const pascalTagName = tagName[0].toUpperCase() + tagName.slice(1);

  const databaseId = getENV(NOTION_DATABASE_ID);

  /** TagFilter option */
  const options = {
    filter: { tagName: pascalTagName },
  };
  const databaseItems = await getDatabaseItems(databaseId, options);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems.slice(...getPaginationRange(pageQuery)));
  const parsedItemsWithPreview = await insertPreviewImage(parsedDatabaseItems);

  return {
    props: {
      databaseItems: parsedItemsWithPreview,
      tagName: pascalTagName,
      totalLength: databaseItems.length,
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};

interface TagsWithPagePath {
  params: {
    tagName: string;
    page: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const parsedItems = parseDatabaseItems(databaseItems);
  const allTags = getAllTags(databaseItems);

  const paths = allTags.reduce<TagsWithPagePath[]>((acc, { id, name }) => {
    const tagItems = parsedItems.filter(({ tags }) => tags.findIndex((tag) => tag.id === id) > -1);

    const path = Array.from({ length: Math.ceil(tagItems.length / ITEMS_PER_PAGE) }, (_, i) => ({
      params: {
        tagName: name.toLowerCase(),
        page: (i + 1).toString(),
      },
    }));

    return [...acc, ...path];
  }, []);

  return {
    paths,
    fallback: 'blocking',
  };
};
