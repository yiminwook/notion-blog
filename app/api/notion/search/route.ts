import BadReqError from '@/controllers/error/badRequestError';
import errorHandler from '@/controllers/error/handler';
import notionCtrl from '@/controllers/notionCtrl';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    if (!query) throw new BadReqError('query is required');
    const parsedSearchItems = await notionCtrl.search(query);
    return NextResponse.json({ databaseItems: parsedSearchItems });
  } catch (error) {
    console.error(error);
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
};
