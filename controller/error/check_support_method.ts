import CustomServerError from './custom_server_error';

const checkSupportMethod = (suportMethod: string[], method: string | undefined) => {
  if (method === undefined || suportMethod.indexOf(method) === -1) {
    throw new CustomServerError({
      statusCode: 405,
      message: 'Not supported Method',
    });
  }
};

export default checkSupportMethod;
