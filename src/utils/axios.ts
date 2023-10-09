import axios, { AxiosRequestConfig } from "axios";
import { getApiPrefix } from "./utils";
import { postRefreshToken } from "../services/auth";
import { history } from "./history";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        history.replace("/login");
      }
      return postRefreshToken().then((res) => {
        if (res.status === 201) {
          localStorage.setItem("token", res.data.token);
          console.log("Access token refreshed!");
          return axiosInstance(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);

export interface BaseParamsType {
  site_uid?: string;
}

export interface BaseInfo {
  id: number;
  name?: string;
}

export const getBaseParams = (): BaseParamsType => {
  return {};
};

export const baseGetRequest =
  <T = any>(url: string, options?: AxiosRequestConfig) =>
  async (params: object = {}) =>
    axiosInstance<T>(getApiPrefix(url), {
      ...options,
      method: "GET",
      params: {
        ...getBaseParams(),
        ...params,
      },
    });

export const baseDetailRequest =
  <T = any>(url: string, options?: AxiosRequestConfig) =>
  async (id: number | string | Array<number | string>, params: object = {}) =>
    axiosInstance<T>(getApiPrefix(url, id), {
      ...options,
      method: "GET",
      params: {
        ...getBaseParams(),
        ...params,
      },
    });

export const basePostRequest =
  <T = any>(url: string, options?: AxiosRequestConfig) =>
  async (data?: object, params: object = {}) =>
    axiosInstance<T>(getApiPrefix(url), {
      ...options,
      method: "POST",
      params: {
        ...getBaseParams(),
        ...params,
      },
      data,
    });

export const basePutRequest =
  <T = any>(url: string, options?: AxiosRequestConfig) =>
  async (
    id: number | string | Array<number | string>,
    data: object,
    params: object = {}
  ) =>
    axiosInstance<T>(getApiPrefix(url, id), {
      ...options,
      method: "PUT",
      params: {
        ...getBaseParams(),
        ...params,
      },
      data,
    });

export const baseDeleteRequest =
  <T = any>(url: string, options?: AxiosRequestConfig) =>
  async (id: number | string | Array<number | string>, params: object = {}) =>
    axiosInstance<T>(getApiPrefix(url, id), {
      ...options,
      method: "DELETE",
      params: {
        ...getBaseParams(),
        ...params,
      },
    });

export default axiosInstance;
