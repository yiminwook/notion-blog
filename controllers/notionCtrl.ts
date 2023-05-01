import { getPageItem, getSearchItems } from '@/models/notionClient';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import BadReqError from '@/controllers/error/badRequestError';
import CustomServerError from '@/controllers/error/customServerError';

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

const image = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, pageId } = req.query;

  if (!type) throw new BadReqError('type is required');
  if (!pageId) throw new BadReqError('pageId is required');

  const pageItem = await getPageItem(pageId.toString());

  const parsedPageItem = parseDatabaseItems([pageItem])[0];

  const { cover, icon } = parsedPageItem;

  let url = '';

  switch (type) {
    case 'cover':
      url = cover;
      break;

    case 'icon':
      if (icon?.type === 'emoji') {
        url = '';
        break;
      }
      url = (icon?.type === 'file' ? icon.file.url : icon?.external.url) ?? '';
      break;
  }

  const content = await axios.get(url, { responseType: 'arraybuffer' });
  const contentBuffer = Buffer.from(content.data);
  const contentHeader = content.headers['content-type'];
  if (!contentHeader) throw new CustomServerError({ statusCode: 404, message: 'content header is not exist' });

  res.setHeader('Content-Type', contentHeader);
  res.send(contentBuffer);
};

const notionCtrl = { search, image };

export default notionCtrl;
