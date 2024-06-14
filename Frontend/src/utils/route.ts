export type QueryStringProperty = {
  [key: QueryStringPropertyKey]: QueryStringPropertyValue;
};

export type QueryStringPropertyKey<T extends PropertyKey = PropertyKey> = T extends symbol
  ? never
  : T;

export type QueryStringPropertyValue = number | string | number[] | string[] | undefined;

export const generateQueryString = (keyValue: QueryStringProperty) =>
  Object.entries(keyValue)
    .reduce((queryString, [key, value]) => {
      const queryValue = Array.isArray(value) ? value.join() : value;

      if (queryValue) {
        return `${queryString}${key}=${queryValue}&`;
      }

      return queryString;
    }, '?')
    .slice(0, -1);

export const getValidQueries = <T extends string>(search: string, queryKeys: Readonly<T[]>) =>
  decodeURIComponent(search)
    .replace(/^\?/, '')
    .split('&')
    .reduce<Partial<Record<T, string>>>((queries, keyValue, _) => {
      const [key, value] = keyValue.split('=');

      if (Object.prototype.hasOwnProperty.call(queries, key)) {
        throw new Error('Duplicated query');
      }

      return queryKeys.includes(key as T) ? { ...queries, [key]: value } : queries;
    }, Object.create(Object.prototype));

export const parseQueryParams = <T extends string>(queryParams: Partial<Record<T, string>>) => {
  return Object.entries(queryParams).reduce((parsedParams, [key, value]) => {
    if (typeof value === 'string' && value.includes(',')) {
      const valuesArray = value.split(',');

      parsedParams[key as T] = valuesArray.every(val => !isNaN(Number(val)))
        ? valuesArray.map(Number)
        : valuesArray;
    } else if (typeof value === 'string') {
      parsedParams[key as T] = isNaN(Number(value)) ? value : Number(value);
    }
    return parsedParams;
  }, {} as Record<T, string | number | (string | number)[]>);
};
