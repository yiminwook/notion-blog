import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import TagItem from '@/components/card/tag/TagItem';

interface TagListProps {
  tags: ParsedDatabaseItemType['tags'];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <ul className="p-4 flex flex-row flex-wrap gap-2">
      {tags.map((item) => (
        <TagItem key={item.id} tagItem={item} />
      ))}
    </ul>
  );
};

export default TagList;
