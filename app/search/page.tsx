import SearchInputSection from '@/components/search/InputSection';
import SearchResultSection from '@/components/search/ResultSection';
import { Metadata } from 'next';

const Search = () => {
  return (
    <>
      <SearchInputSection />
      <SearchResultSection />
    </>
  );
};

export default Search;

interface SearchGenerateMetadataParams {
  searchParams: {
    query: string;
  };
  params: {};
}

export const generateMetadata = ({ searchParams: { query } }: SearchGenerateMetadataParams): Metadata => {
  return {
    title: query ? `${query}: 검색결과` : 'Search',
  };
};
