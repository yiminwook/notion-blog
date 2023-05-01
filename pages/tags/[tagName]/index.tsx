import { getDatabaseItems } from '@/models/notionClient';
import CardSection from '@/components/intro/card_section';
import TagsHeroSection from '@/components/tags/hero_section';
import { getAllTags } from '@/utils/getAllTags';
import { parseDatabaseItems, ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ITEMS_PER_PAGE } from '@/consts/const';
import { getEnv } from '@/utils/getENV';

export interface TagsPageProps {
  databaseItems: ParsedDatabaseItemType[];
  tagName: string;
  totalLength: number;
}

const TagsPage = ({ databaseItems, tagName, totalLength }: TagsPageProps) => {
  return (
    <div>
      <TagsHeroSection title={`#${tagName}`} />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </div>
  );
};

export default TagsPage;

export interface TagsPageParams extends ParsedUrlQuery {
  tagName: string;
}

export const getStaticProps: GetStaticProps<TagsPageProps, TagsPageParams> = async ({ params }) => {
  /* Params */
  const { tagName } = params!;
  const pascalTagName = tagName[0].toUpperCase() + tagName.slice(1);

  const databaseId = getEnv('NOTION_DATABASE_ID');

  /** TagFilter option */
  const options = {
    filter: { tagName: pascalTagName },
  };
  const databaseItems = await getDatabaseItems(databaseId, options);
  const parsedItems = parseDatabaseItems(databaseItems.slice(0, ITEMS_PER_PAGE));
  return {
    props: { databaseItems: parsedItems, tagName: pascalTagName, totalLength: databaseItems.length },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = getEnv('NOTION_DATABASE_ID');
  const databaseItems = await getDatabaseItems(databaseId);
  const allTags = getAllTags(databaseItems);
  const paths = allTags.map(({ name }) => ({
    params: { tagName: name.toLowerCase() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
