import getEnv from '@/utils/getENV';
import { Client } from '@notionhq/client';
import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionAPI } from 'notion-client';

/** @notionhq */
export const notionClient = new Client({
  auth: getEnv('NOTION_API_KEY'),
});

interface DatabaseQueryOption {
  filter?: {
    tagName?: string;
  };
}

/** @notionhq */
export const getDatabaseItems = async (databaseId: string, option?: DatabaseQueryOption) => {
  const databaseResponse = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: '공개',
          checkbox: {
            equals: true,
          },
        },
        {
          property: '태그',
          multi_select: {
            contains: option?.filter?.tagName ?? '',
          },
        },
      ],
    },
    sorts: [
      {
        property: '작성일',
        direction: 'descending',
      },
    ],
  });

  return databaseResponse.results;
};

export const getPageItem = (pageId: string) => {
  const response = notionClient.pages.retrieve({ page_id: pageId });

  return response;
};

/** @notionhq */
export const getSearchItems = async (query: string) => {
  const searchResponse = await notionClient.search({
    query,
    filter: {
      property: 'object',
      value: 'page',
    },
    sort: {
      direction: 'descending',
      timestamp: 'last_edited_time',
    },
  });
  return searchResponse.results as (PageObjectResponse | PartialPageObjectResponse)[];
};

/** notion-client */
export const unofficialNotionClient = new NotionAPI();

/** notion-client */
export const getPageContent = async (pageId: string) => {
  const recordMap = await unofficialNotionClient.getPage(pageId);
  return recordMap;
};
