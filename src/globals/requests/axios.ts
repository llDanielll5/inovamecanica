import axios from "axios";
import { getCookie } from "cookies-next";
import { API_URL } from "./routes";

export const serverUrl = API_URL;

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: serverUrl });
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || `Ocorreu um erro ${error}`
    )
);

axiosInstance.interceptors.request.use(
  (config) => {
    config.baseURL = serverUrl;
    let jwt = getCookie("jwt");
    if (jwt) config.headers.Authorization = `Bearer ${jwt}`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosInstance;
