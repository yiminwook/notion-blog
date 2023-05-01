/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import CardList from '@/components/card/card_list';
import { useSearch } from '@/hooks/useSearch';
import LoadingSpinner from '@/components/common/loading_spinner';

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

const ErrorIndicator = ({ error }: { error: Error }) => {
  return <div>Something is Wrong! {error.message}</div>;
};
