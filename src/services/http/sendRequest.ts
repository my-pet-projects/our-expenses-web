import { AxiosRequestConfig } from 'axios';

import { instance } from './axiosInstance';
import { IHttpRequestOptions } from './http.types';

export const sendRequest = async <T>(
  options: IHttpRequestOptions
): Promise<T> => {
  const config = {
    url: options.path,
    method: options.method,
    signal: options.abortSignal,
    data: options.payload
  } as AxiosRequestConfig;
  const result = await instance.request<T>(config);
  return result.data;
};
