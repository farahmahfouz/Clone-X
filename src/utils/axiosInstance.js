import axios from "axios";
import Cookies from "js-cookie";

// const BASE_URL = "https://clone-x-by-farah.glitch.me";
const LOCAL_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: LOCAL_URL,
  // baseURL: BASE_URL,
  withCredentials: true, // Important for handling cookies
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt"); 
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
        const response = await axiosInstance.post("/users/refresh");
        const newAccessToken = response.data.data.accessToken;
        Cookies.set("jwt", newAccessToken);
        
        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);
        Cookies.remove("jwt");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
