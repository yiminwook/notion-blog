import { getDatabaseItems } from '@/models/notionClient';
import { ParsedDatabaseItemType, parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { GetStaticProps, NextPage } from 'next';
import CardSection from '@/components/intro/CardSection';
import HeroSection from '@/components/intro/HeroSection';
import { ITEMS_PER_PAGE, NOTION_DATABASE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import getENV from '@/utils/getENV';
import { insertPreviewImage } from '@/utils/previewImage';

export interface HomePageProps {
  items: ParsedDatabaseItemType[];
  totalLength: number;
}

const HomePage: NextPage<HomePageProps> = ({ items, totalLength }) => {
  return (
    <div>
      <HeroSection />
      <CardSection cardItems={items} totalLength={totalLength} />
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems.slice(0, ITEMS_PER_PAGE));

  const parsedDatabaseItemsWithPreviewImage = await insertPreviewImage(parsedDatabaseItems);

  return {
    props: {
      items: parsedDatabaseItemsWithPreviewImage,
      totalLength: databaseItems.length,
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};
