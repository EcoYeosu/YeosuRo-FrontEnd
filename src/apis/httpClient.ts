import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

function HttpClient(config?: AxiosRequestConfig) {
  const getResult = (response: AxiosResponse) => response.data;
  const client: AxiosInstance = axios.create(config);

  const onRequestFulfilled = (config: InternalAxiosRequestConfig) => {
    // 매 요청 시마다 최신 토큰을 가져옵니다.
    const token = localStorage.getItem('accessToken');
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
