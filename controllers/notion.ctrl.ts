import { getSearchItems } from '@/models/notionClient';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { NextApiRequest, NextApiResponse } from 'next';
export interface SearchResponseType {
  databaseItems: Awaited<ReturnType<typeof parseDatabaseItems>>;
}

const search = async (req: NextApiRequest, res: NextApiResponse<SearchResponseType>) => {
  const { query } = req.query;
  if (!query) return res.status(200).json({ databaseItems: [] });
  const searchQuery = Array.isArray(query) ? query[0] : query;
  const searchItems = await getSearchItems(searchQuery);
  const parsedSearchItems = parseDatabaseItems(searchItems);
  return res.status(200).json({ databaseItems: parsedSearchItems });
};

const notionCtrl = { search };

export default notionCtrl;
