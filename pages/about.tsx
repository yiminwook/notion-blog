import NotionPageRender from '@/components/notion/page_render';
import { getPageContent } from '@/models/notion_client';
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
  const profileId = process.env.NOTION_PROFILE_ID;
  if (!profileId) throw new Error('PROFILE_ID not defind');
  const recordMap = await getPageContent(profileId);
  return {
    props: { recordMap },
    revalidate: 30,
  };
};
