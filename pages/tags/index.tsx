import { getDatabaseItems } from '@/model/notion_client';
import TagsHeroSection from '@/component/tags/hero_section';
import TagContainer from '@/component/tags/tag_container';
import { getAllTags } from '@/utils/getAllTags';
import { GetStaticProps } from 'next';

interface TagsIndexPageProps {
  tags: ReturnType<typeof getAllTags>;
}

const TagsIndexPage = ({ tags }: TagsIndexPageProps) => {
  return (
    <div className="h-[calc(100vh-4.5rem-5.5rem)]">
      <TagsHeroSection />
      <TagContainer tags={tags} />
    </div>
  );
};

export default TagsIndexPage;

export const getStaticProps: GetStaticProps<TagsIndexPageProps> = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error('DATABASE_ID is not defined');
  const databaseItems = await getDatabaseItems(databaseId);
  const tags = getAllTags(databaseItems);

  return {
    props: { tags },
  };
};
