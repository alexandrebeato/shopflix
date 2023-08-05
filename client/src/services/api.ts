import {
  type AxiosResponse,
  type AxiosInstance,
  type AxiosRequestConfig
} from 'axios';

import { axiosInstance } from '.';

interface AxiosFunctionsProps {
  get: <T>(
    endpoint: string,
    config?: AxiosRequestConfig,
    url?: string
  ) => Promise<AxiosResponse<T>>;
  put: <T>(
    // url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  post: <T, U>(
    body: T,
    endpoint: string,
    config?: AxiosRequestConfig,
    url?: string
  ) => Promise<AxiosResponse<U>>;
  delete: <T>(
    endpoint: string,
    config?: AxiosRequestConfig,
    url?: string
  ) => Promise<AxiosResponse<T>>;
}

const api = (axios: AxiosInstance): AxiosFunctionsProps => {
  return {
    get: async function <T>(
      endpoint: string,
      config: AxiosRequestConfig = {},
      url?: string
    ) {
      return await axios.get<T>(
        `${
          url !== undefined
            ? `${url}${endpoint}`
            : `http://localhost:5011${endpoint}`
        }`,
        config
      );
    },
    put: async function <T>(body: unknown, config: AxiosRequestConfig = {}) {
      return await axios.put<T>('http://localhost:5011', body, config);
    },
    post: async function <T, U>(
      body: T,
      endpoint: string,
      config: AxiosRequestConfig = {},
      url?: string
    ) {
      return await axios.post<U>(
        `${
          url !== undefined
            ? `${url}${endpoint}`
            : `http://localhost:5011${endpoint}`
        }`,
        body,
        config
      );
    },
    delete: async function <T>(
      endpoint: string,
      config: AxiosRequestConfig = {},
      url?: string
    ) {
      return await axios.delete<T>(
        `${
          url !== undefined
            ? `${url}${endpoint}`
            : `http://localhost:5011${endpoint}`
        }`,
        config
      );
    }
  };
};

export default api(axiosInstance);
