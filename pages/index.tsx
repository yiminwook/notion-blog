import { getDatabaseItems } from '@/models/notion_client';
import { ParsedDatabaseItemType, parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { GetStaticProps, NextPage } from 'next';
import CardSection from '@/components/intro/card_section';
import HeroSection from '@/components/intro/hero_section';

interface IndexPageProps {
  items: ParsedDatabaseItemType[];
}

const Home: NextPage<IndexPageProps> = ({ items }) => {
  return (
    <div>
      <HeroSection />
      <CardSection cardItems={items} />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error('DATABASE_ID is not defined');
  const databaseItems = await getDatabaseItems(databaseId);
  const parsedItems = parseDatabaseItems(databaseItems);

  return {
    props: {
      items: parsedItems,
    },
    revalidate: 60,
  };
};
