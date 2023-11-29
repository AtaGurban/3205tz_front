import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const $host: AxiosInstance = axios.create({
  baseURL: baseURL,
});

const $authhost: AxiosInstance = axios.create({
  baseURL: baseURL,
});

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (config.headers) {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
};

$authhost.interceptors.request.use(authInterceptor);

export { $host, $authhost };
