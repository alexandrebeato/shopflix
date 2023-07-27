import axios, {
  type AxiosResponse,
  type AxiosInstance,
  type AxiosRequestConfig
} from 'axios';

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
    // url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
}

// TODO: Environment variables
const axiosiInstance = axios.create({
  baseURL: 'http://localhost:5011'
});

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
    delete: async function <T>(config: AxiosRequestConfig = {}) {
      return await axios.delete<T>('http://localhost:5011', config);
    }
  };
};

export default api(axiosiInstance);
