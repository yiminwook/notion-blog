import NotionPageRender from '@/components/notion/page_render';
import { PAGE_REVALIDATE_TIME } from '@/consts/const';
import { getPageContent } from '@/models/notionClient';
import getEnv from '@/utils/getENV';
import { GetStaticProps, NextPage } from 'next';

interface AboutPageProps {
  recordMap: Awaited<ReturnType<typeof getPageContent>>;
}

const AboutPage: NextPage<AboutPageProps> = ({ recordMap }) => {
  return (
    <div>
      <NotionPageRender recordMap={recordMap} />
    </div>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const profileId = getEnv('NOTION_PROFILE_ID');
  const recordMap = await getPageContent(profileId);
  return {
    props: { recordMap },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};
