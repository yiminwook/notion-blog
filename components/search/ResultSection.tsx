/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import CardList from '@/components/card/CardList';
import { useSearch } from '@/hooks/useSearch';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const SearchResultSection = () => {
  const {
    query: { query },
  } = useRouter();
  const searchQuery = (Array.isArray(query) ? query[0] : query) ?? '';
  const { data, error, isLoading } = useSearch(searchQuery);

  return (
    <section>
      <div className="my-16 px-4">
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

const ErrorIndicator = ({ error }: { error: Error }) => {
  return <div>Something is Wrong! {error.message}</div>;
};
