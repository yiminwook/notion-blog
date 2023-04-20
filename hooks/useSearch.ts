import { SearchResponseType } from '@/controllers/notion.ctrl';
import useSWR from 'swr';
import { fetcher } from './fetcher';

export const useSearch = (searchQuery: string) => {
  const options = {
    errorRetryCount: 2,
    errorRetryInterval: 3 * 1000,
    dedupingInterval: 10 * 1000,
  };
  const { data, error, mutate, isLoading } = useSWR(
    `/api/notion/items.search?query=${searchQuery}`,
    fetcher<SearchResponseType>(),
    options,
  );
  return { data: data?.databaseItems, error, mutate, isLoading };
};
