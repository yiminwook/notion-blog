import { getDatabaseItems } from '@/models/notionClient';
import CardSection from '@/components/intro/CardSection';
import TagsHeroSection from '@/components/tags/HeroSection';
import { getAllTags } from '@/utils/getAllTags';
import { parseDatabaseItems, ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ITEMS_PER_PAGE, NOTION_DATABASE_ID } from '@/consts';
import { getENV } from '@/utils/getENV';
import { insertPreviewImage } from '@/utils/makePreviewImage';
import PageHead from '@/components/layout/PageHead';

export interface TagsPageProps {
  databaseItems: ParsedDatabaseItemType[];
  tagName: string;
  totalLength: number;
}

const TagsPage = ({ databaseItems, tagName, totalLength }: TagsPageProps) => {
  return (
    <div>
      <PageHead title={`#${tagName}`} keywords={tagName} />
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

  const databaseId = getENV(NOTION_DATABASE_ID);

  /** TagFilter option */
  const options = {
    filter: { tagName: pascalTagName },
  };
  const databaseItems = await getDatabaseItems(databaseId, options);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems.slice(0, ITEMS_PER_PAGE));
  const parsedItemsWithPreviewImage = await insertPreviewImage(parsedDatabaseItems);
  return {
    props: {
      databaseItems: parsedItemsWithPreviewImage,
      tagName: pascalTagName,
      totalLength: databaseItems.length,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = getENV(NOTION_DATABASE_ID);
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
