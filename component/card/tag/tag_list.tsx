import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import TagItem from "./tag_item";

interface Props {
  tags: ParsedDatabaseItemType["tags"];
}

const TagList = ({ tags }: Props) => {
  return (
    <ul className="p-4 flex flex-row flex-wrap gap-2">
      {tags.map((item) => (
        <TagItem key={item.id} tagItem={item} />
      ))}
    </ul>
  );
};

export default TagList;
