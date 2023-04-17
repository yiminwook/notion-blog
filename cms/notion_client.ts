import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

/** @notionhq */
export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY ?? "",
});

interface DatabaseQueryOption {
  filter?: {
    tagName?: string;
  };
}

/** @notionhq */
export const getDatabaseItems = async (
  databaseId: string,
  option?: DatabaseQueryOption
) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "공개",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "태그",
          multi_select: {
            contains: option?.filter?.tagName ?? "",
          },
        },
      ],
    },
    sorts: [
      {
        property: "작성일",
        direction: "descending",
      },
    ],
  });

  return response.results;
};

/** notion-client */
export const unofficialNotionClient = new NotionAPI();

/** notion-client */
export const getPageContent = async (pageId: string) => {
  const recordMap = await unofficialNotionClient.getPage(pageId);
  return recordMap;
};
