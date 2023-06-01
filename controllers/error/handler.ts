import CustomServerError from '@/controllers/error/customServerError';

interface ErrorHandlerReturnType {
  status: number;
  message: string;
}
const errorHandler = (err: unknown): ErrorHandlerReturnType => {
  let unknownErr = err;

  if (err instanceof CustomServerError === false) {
    unknownErr = new CustomServerError({
      statusCode: 499,
      message: 'unknown error',
    });
  }

  const { statusCode, serializeErrorMessage } = unknownErr as CustomServerError;
  return { status: statusCode, message: serializeErrorMessage() };
};

export default errorHandler;
