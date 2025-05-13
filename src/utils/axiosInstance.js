import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://clone-x-khaki.vercel.app/";
// const LOCAL_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: LOCAL_URL,
  withCredentials: true, // Important for handling cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt"); // Using jwt as the cookie name
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await axiosInstance.get("/users/refresh");
        const newAccessToken = response.data.data.accessToken;

        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        Cookies.remove("jwt");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
