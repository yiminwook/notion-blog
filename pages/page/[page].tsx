import { ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts/const';
import { getDatabaseItems } from '@/models/notion_client';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import HomePage, { HomePageProps } from '..';

const HomeWithPage = (props: HomePageProps) => {
  return <HomePage {...props} />;
};

export default HomeWithPage;

interface HomeWithPageParams extends ParsedUrlQuery {
  page: string;
}

export const getStaticProps: GetStaticProps<HomePageProps, HomeWithPageParams> = async ({ params }) => {
  const { page } = params!;

  const pageQuery = Number(page);
  if (Number.isNaN(pageQuery)) throw new Error('query is not number');

  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getDatabaseItems(databaseId);

  const parsedItems = parseDatabaseItems(
    databaseItems.slice((pageQuery - 1) * ITEMS_PER_PAGE, pageQuery * ITEMS_PER_PAGE),
  );

  return {
    props: {
      items: parsedItems,
      totalLength: databaseItems.length,
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error('DATABASE_ID is not defined');

  const databaseItems = await getDatabaseItems(databaseId);
  const numberOfPages = Math.ceil(databaseItems.length / ITEMS_PER_PAGE);
  const paths = Array.from({ length: numberOfPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
