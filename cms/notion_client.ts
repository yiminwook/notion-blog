import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

/** @notionhq */
export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY ?? "",
});

/** @notionhq */
export const getDatabaseItems = async (databaseId: string) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: "공개",
      checkbox: {
        equals: true,
      },
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
