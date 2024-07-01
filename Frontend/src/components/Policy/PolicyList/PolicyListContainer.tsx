import PolicyList from '@/components/Policy/PolicyList/PolicyList';
import { useValidQueryParams } from '@/hooks/@common';

import { KEYWORD_FOR_ALL, KeywordForAll } from './PolicyList.api';
import { usePoliciesQuery } from './PolicyList.query';

function PolicyListContainer() {
  const queryParams = useValidQueryParams<KeywordForAll>(KEYWORD_FOR_ALL);
  const { policies } = usePoliciesQuery(queryParams);

  return <PolicyList policies={policies} />;
}

export default PolicyListContainer;
