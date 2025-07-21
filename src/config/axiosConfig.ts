/* Imports */
import axios from "axios";

/* Local Imports */
import { envConfig } from "./envConfig";
import { getAccessToken } from "@/utilities/auth";

// ----------------------------------------------------------------------

const axiosConfig = axios.create({
  baseURL: envConfig.apiBaseUrl,
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) config.headers.authorization = `bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
