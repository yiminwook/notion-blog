import checkSupportMethod from '@/controllers/error/checkSupportMethod';
import errorHandler from '@/controllers/error/handler';
import notionCtrl from '@/controllers/notionCtrl';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    const suportMethod = ['GET'];
    checkSupportMethod(suportMethod, method);
    await notionCtrl.image(req, res);
  } catch (error) {
    console.error(error);
    errorHandler(error, res);
  }
};

export default handler;
