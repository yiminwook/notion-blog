import { getDatabaseItems } from '@/models/notion_client';
import { MultiSelectPropertyItemObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface ParsedDatabaseItemType {
  id: string;
  title: string;
  published: string;
  description: string;
  cover: string;
  icon: PageObjectResponse['icon'];
  tags: MultiSelectPropertyItemObjectResponse['multi_select'];
}

export const parseDatabaseItems = (items: Awaited<ReturnType<typeof getDatabaseItems>>) => {
  const parsedItems = items.reduce<ParsedDatabaseItemType[]>((acc, item) => {
    if (!('properties' in item)) return acc;
    if (item.parent.type !== 'database_id') return acc;

    const { id, icon, cover } = item;
    const { 이름, 작성일, 설명, 태그 } = item.properties;
    const title = 이름.type === 'title' ? 이름.title[0]?.plain_text : '';
    const published = 작성일.type === 'date' ? 작성일.date?.start : '';
    const description = 설명.type === 'rich_text' ? 설명.rich_text[0]?.plain_text : '';
    const parsedCover = cover?.type === 'file' ? cover.file.url : cover?.external.url;
    const tags = 태그.type === 'multi_select' ? 태그.multi_select : [];

    const parsedResult: ParsedDatabaseItemType = {
      id,
      title: title ?? '',
      published: published ?? '',
      description: description ?? '',
      cover: parsedCover ?? '',
      tags,
      icon,
    };

    return [...acc, parsedResult];
  }, []);

  return parsedItems;
};
