import { getDatabaseItems } from '@/models/notionClient';
import TagsHeroSection from '@/components/tags/hero_section';
import TagContainer from '@/components/tags/tag_container';
import { getAllTags } from '@/utils/getAllTags';
import { GetStaticProps } from 'next';
import { getEnv } from '@/utils/getENV';

interface TagsIndexPageProps {
  tags: ReturnType<typeof getAllTags>;
}

const TagsIndexPage = ({ tags }: TagsIndexPageProps) => {
  return (
    <div>
      <TagsHeroSection />
      <TagContainer tags={tags} />
    </div>
  );
};

export default TagsIndexPage;

export const getStaticProps: GetStaticProps<TagsIndexPageProps> = async () => {
  const databaseId = getEnv('NOTION_DATABASE_ID');
  const databaseItems = await getDatabaseItems(databaseId);
  const tags = getAllTags(databaseItems);

  return {
    props: { tags },
  };
};
