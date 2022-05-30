import axios, { AxiosError, AxiosResponse } from 'axios';

import { HttpError } from 'src/models';

const getAuthToken = (): string => {
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : {};
  if (user && user.token) {
    return `Bearer ${user.token}`;
  }
  return '';
};

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: { Accept: 'application/json' },
  timeout: 5000
});

instance.defaults.headers.post['Content-Type'] =
  'application/json;charset=utf-8';
instance.defaults.headers.common['Authorization'] = getAuthToken();

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error(error);
    if (axios.isCancel(error)) {
      console.warn('request was canceled');
    }
    const { response } = error;

    if (response?.status === 401) {
      // return onUnauthorized();
      return Promise.reject(new HttpError('Unauthorized', error.response));
    }

    return Promise.reject(new HttpError(error.message, error.response));
  }
);
