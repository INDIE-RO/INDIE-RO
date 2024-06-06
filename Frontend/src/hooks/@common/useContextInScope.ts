import { Context, useContext } from 'react';

interface InScope {
  inScope: boolean;
}

const useContextInScope = <T extends InScope>(context: Context<T>) => {
  const value = useContext(context);

  if (!value.inScope) throw new Error(`Must use in ${context.displayName || 'root component'}`);

  return value;
};

export default useContextInScope;
