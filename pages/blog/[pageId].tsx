import { getDatabaseItems, getPageContent } from '@/models/notionClient';
import NotionPageRender from '@/components/notion/PageRender';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { NOTION_DATABASE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import getENV from '@/utils/getENV';
import { insertPreviewImageToRecordMap } from '@/utils/previewImage';
import Comments from '@/components/common/Comments';
import PageHead from '@/components/layout/PageHead';
import { getPageProperty, getPageTitle } from 'notion-utils';

interface DetailBlogPageProps {
  recordMap: Awaited<ReturnType<typeof getPageContent>>;
  seo: {
    title: string;
    keywords: string;
    description: string;
    ogImage: string;
  };
}

const DetailBlogPage = ({ recordMap, seo: { title, keywords, description, ogImage } }: DetailBlogPageProps) => {
  return (
    <div>
      <PageHead title={title} keywords={keywords} description={description} image={ogImage} />
      <NotionPageRender recordMap={recordMap} />
      <Comments />
    </div>
  );
};

export default DetailBlogPage;

interface DetailBlogPageParams extends ParsedUrlQuery {
  pageId: string;
}

export const getStaticProps: GetStaticProps<DetailBlogPageProps, DetailBlogPageParams> = async ({ params }) => {
  const { pageId } = params!;

  const recordMap = await getPageContent(pageId);
  const previewImage = await insertPreviewImageToRecordMap(recordMap);
  const propertyValue = Object.values(recordMap.block)[0].value;
  const title = getPageTitle(recordMap);
  const keywords = getPageProperty<string[] | undefined>('태그', propertyValue, recordMap)?.join(', ') ?? '';
  const description = getPageProperty<string | undefined>('설명', propertyValue, recordMap) ?? '';
  const cover = `/api/notion/image?type=cover&pageId=${pageId}`;
  return {
    props: {
      recordMap: {
        ...recordMap,
        preview_images: previewImage,
      },
      seo: {
        title,
        keywords,
        description,
        ogImage: cover,
      },
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const paths = databaseItems.map(({ id: pageId }) => ({ params: { pageId } }));

  return {
    paths,
    fallback: 'blocking', //true일시 pageId가 없어 에러가 날 수 있음
  };
};
