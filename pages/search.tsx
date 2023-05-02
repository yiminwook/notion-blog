import PageHead from '@/components/layout/PageHead';
import SearchInputSection from '@/components/search/InputSection';
import SearchResultSection from '@/components/search/ResultSection';

const Search = () => {
  return (
    <div>
      <PageHead title="Search" />
      <SearchInputSection />
      <SearchResultSection />
    </div>
  );
};

export default Search;
