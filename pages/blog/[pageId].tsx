import { getDatabaseItems, getPageContent } from '@/models/notionClient';
import NotionPageRender from '@/components/notion/PageRender';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { NOTION_DATABASE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import getENV from '@/utils/getENV';

interface DetailBlogPageProps {
  recordMap: Awaited<ReturnType<typeof getPageContent>>;
}

const DetailBlogPage = ({ recordMap }: DetailBlogPageProps) => {
  return (
    <div>
      <NotionPageRender recordMap={recordMap} />
    </div>
  );
};

export default DetailBlogPage;

interface DetailBlogPageParams extends ParsedUrlQuery {
  pageId: string;
}

export const getStaticProps: GetStaticProps<DetailBlogPageProps, DetailBlogPageParams> = async ({ params }) => {
  const { pageId } = params!;

  const recordMap = await getPageContent(pageId);

  return {
    props: { recordMap },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const paths = databaseItems.map(({ id: pageId }) => ({ params: { pageId } }));

  return {
    paths,
    fallback: true,
  };
};
