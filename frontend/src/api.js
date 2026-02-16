import axios from "axios";

/*
=========================================================
AUTO BACKEND URL DETECTION
=========================================================

Local React        -> http://127.0.0.1:8000/api/
Render Frontend    -> https://<backend>.onrender.com/api/

No need to edit code again.
*/

const getBaseURL = () => {
  // If environment variable exists → use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // If running locally (localhost React dev server)
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://127.0.0.1:8000/api/";
  }

  // Otherwise production (Render)
  return "https://e-commerce-major-project1-backend.onrender.com/api/";
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 20000,
});

/*
=========================================================
REQUEST INTERCEPTOR
=========================================================
*/
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    // Auto logout if token expired
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default API;
