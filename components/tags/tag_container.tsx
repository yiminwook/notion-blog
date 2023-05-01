import { getAllTags } from '@/utils/getAllTags';
import TagList from '@/components/card/tag/tag_list';

interface TagContainerProps {
  tags: ReturnType<typeof getAllTags>;
}

const TagContainer = ({ tags }: TagContainerProps) => {
  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto bg-gray-100 rounded-2xl my-8">
        <TagList tags={tags} />
      </div>
    </section>
  );
};

export default TagContainer;
