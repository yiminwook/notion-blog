import { getDatabaseItems, getPageContent } from '@/models/notionClient';
import NotionPageRender from '@/components/notion/PageRender';
import { NOTION_DATABASE_ID } from '@/consts';
import getENV from '@/utils/getENV';
import { insertPreviewImageToRecordMap } from '@/utils/makePreviewImage';
import Comments from '@/components/common/Comments';
import { Metadata } from 'next';
import { getPageProperty, getPageTitle } from 'notion-utils';

interface DetailBlogPageParams {
  pageId: string;
}

export const generateStaticParams = async (): Promise<DetailBlogPageParams[]> => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const paths = databaseItems.map(({ id: pageId }) => ({ pageId }));

  return paths;
};

interface DetailBlogPageContentReturnType {
  recordMap: Awaited<ReturnType<typeof getPageContent>>;
}

const getDetailBlogPageContent = async (pageId: string): Promise<DetailBlogPageContentReturnType> => {
  const recordMap = await getPageContent(pageId);
  const previewImage = await insertPreviewImageToRecordMap(recordMap);

  return {
    recordMap: {
      ...recordMap,
      preview_images: previewImage,
    },
  };
};

interface DetailBlogPageProps {
  params: DetailBlogPageParams;
}
const DetailBlogPage = async ({ params: { pageId } }: DetailBlogPageProps) => {
  const { recordMap } = await getDetailBlogPageContent(pageId);

  return (
    <>
      <NotionPageRender recordMap={recordMap} />
      <Comments />
    </>
  );
};

export default DetailBlogPage;

export const generateMetadata = async ({ params: { pageId } }: DetailBlogPageProps): Promise<Metadata> => {
  const recordMap = await getPageContent(pageId);
  const propertyValue = Object.values(recordMap.block)[0].value;
  const title = getPageTitle(recordMap);
  const keywords = getPageProperty<string[] | undefined>('태그', propertyValue, recordMap)?.join(', ') ?? '';
  const description = getPageProperty<string | undefined>('설명', propertyValue, recordMap) ?? '';
  const cover = `/api/notion/image?type=cover&pageId=${pageId}`;

  return {
    title,
    description,
    keywords,
    openGraph: { images: [cover] },
  };
};
