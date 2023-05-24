import { getDatabaseItems } from '@/models/notionClient';
import TagsHeroSection from '@/components/tags/HeroSection';
import TagContainer from '@/components/tags/TagContainer';
import { getAllTags } from '@/utils/getAllTags';
import { getENV } from '@/utils/getENV';
import { NOTION_DATABASE_ID, PAGE_REVALIDATE_TIME } from '@/consts';
import { Metadata } from 'next';

interface TagsContentReturnType {
  tags: ReturnType<typeof getAllTags>;
}

const getAllTagsContent = async (): Promise<TagsContentReturnType> => {
  const databaseId = getENV(NOTION_DATABASE_ID);
  const databaseItems = await getDatabaseItems(databaseId);
  const tags = getAllTags(databaseItems);

  return { tags };
};

const TagsIndexPage = async () => {
  const { tags } = await getAllTagsContent();

  return (
    <div>
      <TagsHeroSection />
      <TagContainer tags={tags} />
    </div>
  );
};

export default TagsIndexPage;

export const generateMetadata = async (): Promise<Metadata> => {
  const { tags } = await getAllTagsContent();

  return {
    title: 'All Tags',
    keywords: tags.map((tag) => tag.name),
  };
};

export const revalidate = PAGE_REVALIDATE_TIME;
