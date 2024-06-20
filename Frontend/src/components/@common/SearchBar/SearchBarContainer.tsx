import { usePolicySearch } from '@/pages/PolicySearchPage/PolicySearch.hook';

import SearchBar from './SearchBar';

function SearchBarContainer() {
  const { search, changeSearchQuery } = usePolicySearch();

  return <SearchBar updateQuery={changeSearchQuery} onClickSearch={search} />;
}

export default SearchBarContainer;
