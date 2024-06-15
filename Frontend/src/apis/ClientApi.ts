import { indieroFetcher } from '@/apis/fetcher';
import { generateQueryString } from '@/utils/route';

interface RequestOptions {
  params?: any;
  credentials?: boolean;
  headers?: HeadersInit;
}

type Fetcher = <T>(url: string, options?: RequestInit) => Promise<T>;

interface ClientApiConstructorProps {
  headers?: HeadersInit;
  fetcher?: Fetcher;
}

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' } as const;
const DEFAULT_REQUEST_OPTIONS = {
  params: {},
  credentials: false,
  headers: {},
} as const;

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

  get<T>(path: string, requestOptions: RequestOptions = DEFAULT_REQUEST_OPTIONS) {
    return this.#fetcher<T>(this.getUrl(path, requestOptions.params), {
      method: 'GET',
      headers: { ...this.#headers, ...requestOptions.headers },
      credentials: requestOptions.credentials ? 'include' : 'omit',
    });
  }

  post<B>(path: string, requestOptions: RequestOptions = DEFAULT_REQUEST_OPTIONS, body?: B) {
    return this.#fetcher(this.getUrl(path, requestOptions.params), {
      method: 'POST',
      headers: { ...this.#headers, ...requestOptions.headers },
      body: body ? JSON.stringify(body) : null,
      credentials: requestOptions.credentials ? 'include' : 'omit',
    });
  }

  patch<B>(path: string, requestOptions: RequestOptions = DEFAULT_REQUEST_OPTIONS, body?: B) {
    return this.#fetcher(this.getUrl(path, requestOptions.params), {
      method: 'PATCH',
      headers: { ...this.#headers, ...requestOptions.headers },
      body: body ? JSON.stringify(body) : null,
      credentials: requestOptions.credentials ? 'include' : 'omit',
    });
  }

  put<B>(path: string, requestOptions: RequestOptions = DEFAULT_REQUEST_OPTIONS, body?: B) {
    return this.#fetcher(this.getUrl(path, requestOptions.params), {
      method: 'PUT',
      headers: { ...this.#headers, ...requestOptions.headers },
      body: body ? JSON.stringify(body) : null,
      credentials: requestOptions.credentials ? 'include' : 'omit',
    });
  }

  delete(path: string, requestOptions: RequestOptions = DEFAULT_REQUEST_OPTIONS) {
    return this.#fetcher(this.getUrl(path, requestOptions.params), {
      method: 'DELETE',
      headers: { ...this.#headers, ...requestOptions.headers },
      credentials: requestOptions.credentials ? 'include' : 'omit',
    });
  }
}

export const indieroClient = new ClientApi({ fetcher: indieroFetcher });
