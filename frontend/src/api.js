import axios from "axios";

const BASE_URL = "https://e-commerce-major-project1-backend.onrender.com/api/";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 20000, // 20 seconds (helps avoid hanging requests)
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If sending FormData (for images), remove JSON header
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default API;
