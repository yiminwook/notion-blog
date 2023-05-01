import { getAllTags } from '@/utils/getAllTags';
import TagList from '@/components/card/tag/tag_list';

interface TagContainerProps {
  tags: ReturnType<typeof getAllTags>;
}

const TagContainer = ({ tags }: TagContainerProps) => {
  return (
    <section>
      <div className="my-8 mx-4 bg-gray-100 rounded-2xl ">
        <TagList tags={tags} />
      </div>
    </section>
  );
};

export default TagContainer;
