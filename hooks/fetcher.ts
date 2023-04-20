import axios, { AxiosResponse } from 'axios';

/** query가 false이거나 빈문자열이면 실행하지않음 */
export const fetcher =
  <T>(query: string | boolean) =>
  async (url: string) => {
    if (!query) return;
    const response: AxiosResponse<T> = await axios.get(url);
    return response.data;
  };
