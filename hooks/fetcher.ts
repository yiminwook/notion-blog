import axios, { AxiosResponse } from 'axios';

export const fetcher = async (url: string) => {
  const response: AxiosResponse = await axios.get(url);
  return response.data;
};
