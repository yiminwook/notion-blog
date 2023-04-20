import { ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts/const';
import { getDatabaseItems } from '@/models/notion_client';
import { getAllTags } from '@/utils/getAllTags';
import { getEnv } from '@/utils/getEnv';
import getPaginationRange from '@/utils/getPaginationRange';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { GetStaticPaths, GetStaticProps } from 'next';
import TagsPage, { TagsPageParams, TagsPageProps } from '..';

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

  const databaseId = getEnv('NOTION_DATABASE_ID');

  /** TagFilter option */
  const options = {
    filter: { tagName: pascalTagName },
  };
  const databaseItems = await getDatabaseItems(databaseId, options);
  const parsedItems = parseDatabaseItems(databaseItems.slice(...getPaginationRange(pageQuery)));

  return {
    props: {
      databaseItems: parsedItems,
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
  const databaseId = getEnv('NOTION_DATABASE_ID');
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
