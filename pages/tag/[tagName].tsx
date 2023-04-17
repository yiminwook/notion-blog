import { getDatabaseItems } from "@/cms/notion_client";
import CardSection from "@/component/intro/card_section";
import TagHeroSection from "@/component/tag/hero_section";
import { getAllTags } from "@/utils/getAllTags";
import {
  parseDatabaseItems,
  ParsedDatabaseItemType,
} from "@/utils/parseDatabaseItems";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface TagPageProps {
  databaseItems: ParsedDatabaseItemType[];
  tagName: string;
}

const TagPage = ({ databaseItems, tagName }: TagPageProps) => {
  return (
    <div>
      <TagHeroSection title={`#${tagName}`} />
      <CardSection cardItems={databaseItems} />
    </div>
  );
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
  const pascalTagName = tagName[0].toUpperCase() + tagName.slice(1);
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error("DATABASE_ID is not defined");
  const options = {
    filter: { tagName: pascalTagName },
  };
  const databaseItems = await getDatabaseItems(databaseId, options);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems);
  return {
    props: { databaseItems: parsedDatabaseItems, tagName: pascalTagName },
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
