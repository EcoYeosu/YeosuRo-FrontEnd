import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const getResult = (response: AxiosResponse) => response.data;

function HttpClient(config?: AxiosRequestConfig) {
  const client: AxiosInstance = axios.create(config);
  const token = '';

  const onRequestFulfilled = (config: InternalAxiosRequestConfig) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  };

  const onRequestRejected = (error: AxiosError) => {
    return Promise.reject(error);
  };

  const onResponseFulfilled = (response: AxiosResponse) => {
    return response;
  };

  const onResponseRejected = (error: AxiosError) => {
    return Promise.reject(error.response);
  };

  client.interceptors.request.use(onRequestFulfilled, onRequestRejected);
  client.interceptors.response.use(onResponseFulfilled, onResponseRejected);

  return {
    get<T>(...args: Parameters<typeof client.get>) {
      return client.get<T>(...args).then(getResult);
    },
    post<T>(...args: Parameters<typeof client.post>) {
      return client.post<T>(...args).then(getResult);
    },
    put<T>(...args: Parameters<typeof client.put>) {
      return client.put<T>(...args).then(getResult);
    },
    patch<T>(...args: Parameters<typeof client.patch>) {
      return client.patch<T>(...args).then(getResult);
    },
    delete<T>(...args: Parameters<typeof client.delete>) {
      return client.delete<T>(...args).then(getResult);
    },
  };
}

export default HttpClient;
