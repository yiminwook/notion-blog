import { getDatabaseItems } from "@/cms/notion_client";
import {
  ParsedDatabaseItemType,
  parseDatabaseItems,
} from "@/utils/parseDatabaseItems";
import { GetStaticProps, NextPage } from "next";
import CardSection from "../component/intro/card_section";
import HeroSection from "../component/intro/hero_section";

interface Props {
  items: ParsedDatabaseItemType[];
}

const Home: NextPage<Props> = ({ items }) => {
  return (
    <div>
      <HeroSection />
      <CardSection cardItems={items} />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(databaseId);
  const parsedItems = parseDatabaseItems(databaseItems);

  return {
    props: {
      items: parsedItems,
    },
    revalidate: 60,
  };
};
