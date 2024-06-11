export type QueryStringProperty = {
  [key: QueryStringPropertyKey]: QueryStringPropertyValue;
};

export type QueryStringPropertyKey<T extends PropertyKey = PropertyKey> = T extends symbol
  ? never
  : T;

export type QueryStringPropertyValue = number | string | number[] | string[];

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
