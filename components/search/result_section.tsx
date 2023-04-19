/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import CardList from '../card/card_list';
import { useSearch } from '@/hooks/useSearch';
import LoadingSpinner from '../common/loading_spinner';

const SearchResultSection = () => {
  const {
    query: { query },
  } = useRouter();
  const searchQuery = (Array.isArray(query) ? query[0] : query) ?? '';
  const { data, error, isLoading } = useSearch(searchQuery);

  return (
    <section>
      <div className="w-4/5 max-w-5xl my-16 mx-auto">
        {data ? <CardList cardItems={data} /> : null}
        {isLoading ? <LoadingIndicator /> : null}
        {error ? <ErrorIndicator error={error} /> : null}
      </div>
    </section>
  );
};
export default SearchResultSection;

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center my-16">
      <LoadingSpinner />
    </div>
  );
};

interface ErrorIndicatorProps {
  error: Error;
}

const ErrorIndicator = ({ error }: ErrorIndicatorProps) => {
  return <div>Something is Wrong! {error.message}</div>;
};
