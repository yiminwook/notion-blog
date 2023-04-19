import { getDatabaseItems, getPageContent } from '@/models/notion_client';
import NotionPageRender from '@/components/notion/page_render';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

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
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error('DATABASE_ID is not defined');
  const databaseItems = await getDatabaseItems(databaseId);

  const paths = databaseItems.map(({ id: pageId }) => ({ params: { pageId } }));

  return {
    paths,
    fallback: true,
  };
};
