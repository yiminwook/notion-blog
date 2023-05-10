import { getDatabaseItems, getPageContent } from '@/models/notionClient';
import NotionPageRender from '@/components/notion/PageRender';
import { NOTION_DATABASE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import getENV from '@/utils/getENV';
import { insertPreviewImageToRecordMap } from '@/utils/makePreviewImage';
import Comments from '@/components/common/Comments';

interface DetailBlogPageParams {
  pageId: string;
}

export const generateStaticParams = async (): Promise<DetailBlogPageParams[]> => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const paths = databaseItems.map(({ id: pageId }) => ({ pageId }));

  return paths;
};

interface DetailBlogPageContentType {
  recordMap: Awaited<ReturnType<typeof getPageContent>>;
  // seo: {
  //   title: string;
  //   keywords: string;
  //   description: string;
  //   ogImage: string;
  // };
}

const getDetailBlogPageContent = async (pageId: string): Promise<DetailBlogPageContentType> => {
  const recordMap = await getPageContent(pageId);
  const previewImage = await insertPreviewImageToRecordMap(recordMap);
  // const propertyValue = Object.values(recordMap.block)[0].value;
  // const title = getPageTitle(recordMap);
  // const keywords = getPageProperty<string[] | undefined>('태그', propertyValue, recordMap)?.join(', ') ?? '';
  // const description = getPageProperty<string | undefined>('설명', propertyValue, recordMap) ?? '';
  // const cover = `/api/notion/image?type=cover&pageId=${pageId}`;

  return {
    recordMap: {
      ...recordMap,
      preview_images: previewImage,
    },
    // seo: {
    //   title,
    //   keywords,
    //   description,
    //   ogImage: cover,
    // },
  };
};

interface DetailBlogPageProps {
  params: DetailBlogPageParams;
}
const DetailBlogPage = async ({ params }: DetailBlogPageProps) => {
  const { recordMap } = await getDetailBlogPageContent(params.pageId);

  return (
    <div>
      {/* <PageHead title={title} keywords={keywords} description={description} image={ogImage} /> */}
      <NotionPageRender recordMap={recordMap} />
      <Comments />
    </div>
  );
};

export default DetailBlogPage;

export const revalidate = PAGE_REVALIDATE_TIME;
// fallback: 'blocking', //true일시 pageId가 없어 에러가 날 수 있음
