import { getDatabaseItems } from "@/cms/notion_client";
import { GetStaticProps, NextPage } from "next";

interface Props {}

const Home: NextPage<Props> = ({}) => {
  return (
    <>
      <div>Home</div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(databaseId);
  console.log(databaseItems);
  return {
    props: {},
    revalidate: 30,
  };
};
