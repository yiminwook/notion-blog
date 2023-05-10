import { getDatabaseItems } from '@/models/notionClient';
import { ParsedDatabaseItemType, parseDatabaseItems } from '@/utils/parseDatabaseItems';
import CardSection from '@/components/intro/CardSection';
import HeroSection from '@/components/intro/HeroSection';
import { ITEMS_PER_PAGE, NOTION_DATABASE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import getENV from '@/utils/getENV';
import { insertPreviewImage } from '@/utils/makePreviewImage';

export interface DatabaseItemsReturnType {
  items: ParsedDatabaseItemType[];
  totalLength: number;
}

const getFirstDatabaseItems = async (): Promise<DatabaseItemsReturnType> => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems.slice(0, ITEMS_PER_PAGE));

  const parsedDatabaseItemsWithPreviewImage = await insertPreviewImage(parsedDatabaseItems);

  return {
    items: parsedDatabaseItemsWithPreviewImage,
    totalLength: databaseItems.length,
  };
};

const HomePage = async () => {
  const { items, totalLength } = await getFirstDatabaseItems();
  return (
    <div>
      <HeroSection />
      <CardSection cardItems={items} totalLength={totalLength} />
    </div>
  );
};

export default HomePage;

export const revaildate = PAGE_REVALIDATE_TIME;
