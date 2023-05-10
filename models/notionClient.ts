import { NOTION_API_KEY } from '@/consts';
import getENV from '@/utils/getENV';
import { Client } from '@notionhq/client';
import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionAPI } from 'notion-client';

/** @notionhq */
export const notionClient = new Client({
  auth: getENV(NOTION_API_KEY),
  fetch,
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
  const signedURL = recordMap.signed_urls;
  const filteredSignedURL = Object.keys(signedURL).reduce<typeof signedURL>((acc, curr) => {
    if (signedURL[curr].indexOf('expirationTimestamp') > -1) return acc; //만료될 수 있는 url 삭제
    acc[curr] = recordMap.signed_urls[curr];

    return acc;
  }, {});

  recordMap.signed_urls = filteredSignedURL;

  return recordMap;
};
