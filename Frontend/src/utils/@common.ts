import { Children, ReactNode, isValidElement } from 'react';

type Func<T> = (arg: T) => void;

export const executeSequentially = <T>(...funcs: Array<Func<T> | undefined>): Func<T> => {
  return arg => funcs.forEach(func => func?.(arg));
};

export const getValidChild = <T>(children: ReactNode) => {
  const child = Children.only(children);

  return isValidElement<T>(child) ? child : null;
};
