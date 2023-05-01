import CustomServerError from '@/controllers/error/custom_server_error';

/** statusCode: 400 */
export default class BadReqError extends CustomServerError {
  constructor(message: string) {
    super({ statusCode: 400, message });
  }
}
