import axios, { AxiosRequestConfig } from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config; // 必须返回配置
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {}
);

export default service;
