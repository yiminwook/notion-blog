import { getDatabaseItems } from '@/model/notion_client';
import { ParsedDatabaseItemType } from './parseDatabaseItems';

/** tag 중복제거 */
export const getAllTags = (items: Awaited<ReturnType<typeof getDatabaseItems>>) => {
  const tags = items.reduce<ParsedDatabaseItemType['tags']>((acc, item) => {
    if (!('properties' in item)) return acc;
    const { 태그 } = item.properties;
    const tags = 태그.type === 'multi_select' ? 태그.multi_select : [];
    tags.forEach((tag) => {
      const isAlreadyExist = acc.findIndex((accTag) => accTag.id === tag.id) > -1;
      if (!isAlreadyExist) acc.push(tag);
    });

    return acc;
  }, []);

  return tags;
};
