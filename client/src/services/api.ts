import axios, {
  type AxiosResponse,
  type AxiosInstance,
  type AxiosRequestConfig
} from 'axios';

interface AxiosFunctions {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  put: <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  post: <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
}

// TODO: Environment variables
const axiosiInstance = axios.create({
  baseURL: 'http://localhost:5011'
});

const api = (axios: AxiosInstance): AxiosFunctions => {
  return {
    get: async function <T>(url: string, config: AxiosRequestConfig = {}) {
      return await axios.get<T>(url, config);
    },
    put: async function <T>(
      url: string,
      body: unknown,
      config: AxiosRequestConfig = {}
    ) {
      return await axios.put<T>(url, body, config);
    },
    post: async function <T>(
      url: string,
      body: unknown,
      config: AxiosRequestConfig = {}
    ) {
      return await axios.post<T>(url, body, config);
    },
    delete: async function <T>(url: string, config: AxiosRequestConfig = {}) {
      return await axios.delete<T>(url, config);
    }
  };
};

export default api(axiosiInstance);
