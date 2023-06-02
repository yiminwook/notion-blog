import { ParsedDatabaseItemType, pascalTagName } from '@/utils/parseDatabaseItems';
import Link from 'next/link';
import { COLOR_TABLE } from '@/consts';
import { useMemo } from 'react';

interface TagItemProps {
  tagItem: ParsedDatabaseItemType['tags'][number];
}

const TagItem = ({ tagItem }: TagItemProps) => {
  const { name, color } = tagItem;

  const pascalName = useMemo(() => pascalTagName(name), [name]);

  return (
    <li>
      <Link
        href={`/tags/${name.toLocaleLowerCase()}`}
        className="block px-2 py-1 rounded-full font-light text-gray-800 text-sm hover:text-white"
        style={{ backgroundColor: COLOR_TABLE[color] }}
      >
        #{pascalName}
      </Link>
    </li>
  );
};
export default TagItem;
