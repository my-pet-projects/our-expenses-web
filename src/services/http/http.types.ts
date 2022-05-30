export interface IHttpRequestOptions<T = unknown> {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: T;
  abortSignal?: AbortSignal;
}

export type RequestHeaders = { [name: string]: string };
