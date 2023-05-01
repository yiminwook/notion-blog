import { NextApiResponse } from 'next';
import CustomServerError from '@/controllers/error/customServerError';

const errorHandler = (err: unknown, res: NextApiResponse) => {
  let unknownErr = err;
  if (err instanceof CustomServerError === false) {
    unknownErr = new CustomServerError({
      statusCode: 499,
      message: 'unknown error',
    });
  }
  const customErr = unknownErr as CustomServerError;
  return res
    .status(customErr.statusCode)
    .setHeader('location', customErr.location ?? '') //redirection
    .send(customErr.serializeErrors());
};

export default errorHandler;
