import type { NextApiRequest, NextApiResponse } from 'next';
import checkSupportMethod from '@/controller/error/check_support_method';
import errorHandler from '@/controller/error/handler';
import notionCtrl from '@/controller/notion.ctrl';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    const suportMethod = ['GET'];
    checkSupportMethod(suportMethod, method);
    await notionCtrl.search(req, res);
  } catch (error) {
    console.error(error);
    errorHandler(error, res);
  }
};

export default handler;
