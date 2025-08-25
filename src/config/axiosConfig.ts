/* Imports */
import axios, { type AxiosInstance } from "axios";

/* Local Imports */
import { envConfig } from "./envConfig";
import {
  getAccessToken,
  getTempToken,
  isValidTempToken,
  isValidToken,
} from "@/utilities/auth";
import { AUTH_ENDPOINTS } from "@/services/endpoints";

// ----------------------------------------------------------------------

const axiosConfig: AxiosInstance = axios.create({
  baseURL: envConfig.apiBaseUrl,
});

// Request Interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    let token;

    if (config.url === AUTH_ENDPOINTS.SELECT_LOGIN_OPTION) {
      const tempToken = getTempToken();
      if (tempToken && isValidTempToken(tempToken)) {
        token = tempToken;
      }
    } else {
      const accessToken = getAccessToken();
      if (accessToken && isValidToken(accessToken)) {
        token = accessToken;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized: Token expired or invalid.");
      // LogoutUser();
    }
    return Promise.reject(error);
  }
);

export const axiosInstance = axiosConfig;
export default axiosConfig;
