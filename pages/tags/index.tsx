import { getDatabaseItems } from '@/models/notionClient';
import TagsHeroSection from '@/components/tags/HeroSection';
import TagContainer from '@/components/tags/TagContainer';
import { getAllTags } from '@/utils/getAllTags';
import { GetStaticProps } from 'next';
import { getENV } from '@/utils/getENV';
import { NOTION_DATABASE_ID } from '@/consts';
import PageHead from '@/components/layout/PageHead';

interface TagsIndexPageProps {
  tags: ReturnType<typeof getAllTags>;
}

const TagsIndexPage = ({ tags }: TagsIndexPageProps) => {
  const keyword = tags.map((tag) => tag.name).join(', ');
  return (
    <div>
      <PageHead title="All Tags" keywords={keyword} />
      <TagsHeroSection />
      <TagContainer tags={tags} />
    </div>
  );
};

export default TagsIndexPage;

export const getStaticProps: GetStaticProps<TagsIndexPageProps> = async () => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const tags = getAllTags(databaseItems);

  return {
    props: { tags },
  };
};
