import { SearchResponseType } from '@/controllers/notion.ctrl';
import useSWR from 'swr';
import { fetcher } from '@/hooks/fetcher';

export const useSearch = (searchQuery: string) => {
  const options = {
    errorRetryCount: 2,
    errorRetryInterval: 3 * 1000,
    dedupingInterval: 10 * 1000,
  };
  const { data, error, mutate, isLoading } = useSWR(
    `/api/notion/page.search?query=${searchQuery}`,
    fetcher<SearchResponseType>(searchQuery),
    options,
  );
  return { data: data?.databaseItems, error, mutate, isLoading };
};
