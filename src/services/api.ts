import axios from "axios";
import { useAuthStore } from "../hooks/useAuthStore";

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

apiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const baseURL = error.config?.baseURL;
    // remove base URL from the request URL
    const originalRequest = {
      ...error.config,
      url: error.config.url.replace(baseURL, ""),
    };
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/login"
    ) {
      originalRequest._retry = true;

      try {
        const res = await apiService.post(
          `${import.meta.env.VITE_API_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.token;

        const setToken = useAuthStore.getState().setToken;
        setToken(newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiService(originalRequest);
      } catch (refreshError) {
        const logout = useAuthStore.getState().logout;
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiService;
