import { indieroFetcher } from '@/apis/fetcher';
import { QueryStringProperty, generateQueryString } from '@/utils/route';

interface RequestOptions {
  path: string;
  params?: QueryStringProperty;
  credentials?: boolean;
}

type Fetcher = <T>(url: string, options?: RequestInit) => Promise<T>;

interface ClientApiConstructorProps {
  headers?: HeadersInit;
  fetcher?: Fetcher;
}

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' } as const;

export class ClientApi {
  #headers: HeadersInit;
  #fetcher: Fetcher;

  constructor({ headers = DEFAULT_HEADERS, fetcher = indieroFetcher }: ClientApiConstructorProps) {
    this.#headers = headers;
    this.#fetcher = fetcher;
  }

  getUrl(path = '', params = {}) {
    return path + generateQueryString(params);
  }

  get({ path, params, credentials = false }: RequestOptions, headers?: HeadersInit) {
    return this.#fetcher(this.getUrl(path, params), {
      method: 'GET',
      headers: { ...this.#headers, ...headers },
      credentials: credentials ? 'include' : 'omit',
    });
  }

  post<B>({ path, params, credentials = false }: RequestOptions, headers?: HeadersInit, body?: B) {
    return this.#fetcher(this.getUrl(path, params), {
      method: 'POST',
      headers: { ...this.#headers, ...headers },
      body: body ? JSON.stringify(body) : null,
      credentials: credentials ? 'include' : 'omit',
    });
  }

  patch<B>({ path, params, credentials = false }: RequestOptions, headers?: HeadersInit, body?: B) {
    return this.#fetcher(this.getUrl(path, params), {
      method: 'PATCH',
      headers: { ...this.#headers, ...headers },
      body: body ? JSON.stringify(body) : null,
      credentials: credentials ? 'include' : 'omit',
    });
  }

  put<B>({ path, params, credentials = false }: RequestOptions, headers?: HeadersInit, body?: B) {
    return this.#fetcher(this.getUrl(path, params), {
      method: 'PUT',
      headers: { ...this.#headers, ...headers },
      body: body ? JSON.stringify(body) : null,
      credentials: credentials ? 'include' : 'omit',
    });
  }

  delete({ path, params, credentials = false }: RequestOptions, headers?: HeadersInit) {
    return this.#fetcher(this.getUrl(path, params), {
      method: 'DELETE',
      headers: { ...this.#headers, ...headers },
      credentials: credentials ? 'include' : 'omit',
    });
  }
}

export const indieroClient = new ClientApi({ fetcher: indieroFetcher });
