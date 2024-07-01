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

export const updateQueryString = (newQueryString: string) => {
  const baseParams = new URLSearchParams(location.search);
  const newParams = new URLSearchParams(newQueryString);

  newParams.forEach((value, key) => {
    if (baseParams.has(key)) {
      baseParams.delete(key);
    }

    baseParams.append(key, value);
  });

  return `?${baseParams.toString().replace(/%2C/g, ',')}`;
};

export const replaceQueryString = (newQueryString: string, exclude?: string[]) => {
  const baseParams = new URLSearchParams(location.search);
  const newParams = new URLSearchParams(newQueryString);

  new URLSearchParams(baseParams).forEach((_, key) => {
    if (exclude?.includes(key)) return;

    baseParams.delete(key);
  });

  newParams.forEach((value, key) => {
    baseParams.append(key, value);
  });

  return `?${baseParams.toString().replace(/%2C/g, ',')}`;
};

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
