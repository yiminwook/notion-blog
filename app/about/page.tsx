import NotionPageRender from '@/components/notion/PageRender';
import { NOTION_PROFILE_ID } from '@/consts';
import { getPageContent } from '@/models/notionClient';
import getENV from '@/utils/getENV';
import { insertPreviewImageToRecordMap } from '@/utils/makePreviewImage';
import { Metadata } from 'next';

interface AboutPageContentReturnType {
  recordMap: Awaited<ReturnType<typeof getPageContent>>;
}

const getAboutPageContent = async (): Promise<AboutPageContentReturnType> => {
  const profileId = getENV(NOTION_PROFILE_ID);
  const recordMap = await getPageContent(profileId);
  const recordMapWithPreview = await insertPreviewImageToRecordMap(recordMap);

  return {
    recordMap: {
      ...recordMap,
      preview_images: recordMapWithPreview,
    },
  };
};

const AboutPage = async () => {
  const { recordMap } = await getAboutPageContent();
  return (
    <>
      <NotionPageRender recordMap={recordMap} />
    </>
  );
};

export default AboutPage;

export const generateMetadata = (): Metadata => {
  const profileId = getENV(NOTION_PROFILE_ID);
  const cover = `/api/notion/image?type=cover&pageId=${profileId}`;

  return {
    title: 'About',
    openGraph: {
      images: [cover],
    },
  };
};
