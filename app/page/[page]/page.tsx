import { DatabaseItemsReturnType } from '@/app/page';
import CardSection from '@/components/intro/CardSection';
import HeroSection from '@/components/intro/HeroSection';
import { ITEMS_PER_PAGE, NOTION_DATABASE_ID } from '@/consts';
import { getDatabaseItems } from '@/models/notionClient';
import { getENV } from '@/utils/getENV';
import getPaginationRange from '@/utils/getPaginationRange';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';

interface HomeWithPageParams {
  page: string;
}

export const generateStaticParams = async (): Promise<HomeWithPageParams[]> => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const numberOfPages = Math.ceil(databaseItems.length / ITEMS_PER_PAGE);
  const paths = Array.from({ length: numberOfPages }, (_, i) => ({ page: (i + 1).toString() }));

  return paths;
};

const getPageDatabaseItems = async (page: string): Promise<DatabaseItemsReturnType> => {
  const pageQuery = Number(page);
  if (Number.isNaN(pageQuery)) throw new Error('PageQuery is not number');

  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const parsedItems = parseDatabaseItems(databaseItems.slice(...getPaginationRange(pageQuery)));

  return {
    items: parsedItems,
    totalLength: databaseItems.length,
  };
};

interface HomeWithPageProps {
  params: HomeWithPageParams;
}

const HomeWithPage = async ({ params }: HomeWithPageProps) => {
  const { items, totalLength } = await getPageDatabaseItems(params.page);
  return (
    <div>
      <HeroSection />
      <CardSection cardItems={items} totalLength={totalLength} />
    </div>
  );
};

export default HomeWithPage;
