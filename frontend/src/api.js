import axios from "axios";

/*
=========================================================
AUTO BACKEND URL DETECTION
=========================================================
*/

const getBaseURL = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://127.0.0.1:8000/api/";
  }

  return "https://e-commerce-major-project1-backend.onrender.com/api/";
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 20000,
});

/*
=========================================================
REQUEST INTERCEPTOR (🔥 FIXED TOKEN)
=========================================================
*/
API.interceptors.request.use(
  (config) => {
    // 🔥 FIX: get token from userInfo
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.access) {
      config.headers.Authorization = `Bearer ${userInfo.access}`;
    }

    // Handle FormData vs JSON automatically
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/*
=========================================================
RESPONSE INTERCEPTOR
=========================================================
*/
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default API;
