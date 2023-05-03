import PageHead from '@/components/layout/PageHead';
import NotionPageRender from '@/components/notion/PageRender';
import { NOTION_PROFILE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import { getPageContent, getPageItem } from '@/models/notionClient';
import getENV from '@/utils/getENV';
import { insertPreviewImageToRecordMap } from '@/utils/previewImage';
import { GetStaticProps, NextPage } from 'next';

interface AboutPageProps {
  recordMap: Awaited<ReturnType<typeof getPageContent>>;
  ogImage: string;
}

const AboutPage: NextPage<AboutPageProps> = ({ recordMap, ogImage }) => {
  return (
    <div>
      <PageHead title="About" image={ogImage} />
      <NotionPageRender recordMap={recordMap} />
    </div>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const profileId = getENV(NOTION_PROFILE_ID);

  const recordMap = await getPageContent(profileId);
  const recordMapWithPreview = await insertPreviewImageToRecordMap(recordMap);
  const cover = `/api/notion/image?type=cover&pageId=${profileId}`;
  return {
    props: {
      recordMap: {
        ...recordMap,
        preview_images: recordMapWithPreview,
      },
      ogImage: cover,
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};
