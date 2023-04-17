import { getDatabaseItems } from "@/cms/notion_client";
import { getAllTags } from "@/utils/getAllTags";
import {
  parseDatabaseItems,
  ParsedDatabaseItemType,
} from "@/utils/parseDatabaseItems";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface TagPageProps {
  databaseItems: ParsedDatabaseItemType[];
}

const TagPage = ({ databaseItems }: TagPageProps) => {
  return <div>TagPage</div>;
};

export default TagPage;

interface TagPageParams extends ParsedUrlQuery {
  tagName: string;
}

export const getStaticProps: GetStaticProps<
  TagPageProps,
  TagPageParams
> = async ({ params }) => {
  const { tagName } = params!;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error("DATABASE_ID is not defined");
  const options = {
    filter: { tagName: tagName[0].toUpperCase() + tagName.slice(1) },
  };
  const databaseItems = await getDatabaseItems(databaseId, options);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems);
  return {
    props: { databaseItems: parsedDatabaseItems },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getDatabaseItems(databaseId);
  const tags = getAllTags(databaseItems);
  const paths = tags.map(({ name }) => ({
    params: { tagName: name.toLowerCase() },
  }));

  return {
    paths,
    fallback: true,
  };
};
