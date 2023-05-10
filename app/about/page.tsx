import NotionPageRender from '@/components/notion/PageRender';
import { NOTION_PROFILE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import { getPageContent } from '@/models/notionClient';
import getENV from '@/utils/getENV';
import { insertPreviewImageToRecordMap } from '@/utils/makePreviewImage';

interface AboutPageContentType {
  recordMap: Awaited<ReturnType<typeof getPageContent>>;
  ogImage: string;
}

const getAboutPageContent = async (): Promise<AboutPageContentType> => {
  const profileId = getENV(NOTION_PROFILE_ID);

  const recordMap = await getPageContent(profileId);
  const recordMapWithPreview = await insertPreviewImageToRecordMap(recordMap);
  const cover = `/api/notion/image?type=cover&pageId=${profileId}`;
  return {
    recordMap: {
      ...recordMap,
      preview_images: recordMapWithPreview,
    },
    ogImage: cover,
  };
};

const AboutPage = async () => {
  const { recordMap, ogImage } = await getAboutPageContent();
  return (
    <div>
      {/* <PageHead title="About" image={ogImage} /> */}
      <NotionPageRender recordMap={recordMap} />
    </div>
  );
};

export default AboutPage;

export const revaildate = PAGE_REVALIDATE_TIME;
