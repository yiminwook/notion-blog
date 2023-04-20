import { getDatabaseItems } from '@/models/notion_client';
import { ParsedDatabaseItemType, parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { GetStaticProps, NextPage } from 'next';
import CardSection from '@/components/intro/card_section';
import HeroSection from '@/components/intro/hero_section';
import { ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts/const';

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
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error('DATABASE_ID is not defined');
  const databaseItems = await getDatabaseItems(databaseId);
  const parsedItems = parseDatabaseItems(databaseItems.slice(0, ITEMS_PER_PAGE));

  return {
    props: {
      items: parsedItems,
      totalLength: databaseItems.length,
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};
