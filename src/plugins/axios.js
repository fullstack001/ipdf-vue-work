import axios from "axios";

const instance = axios.create({
  // baseURL: "http://127.0.0.1:5000/api",
  baseURL: "https://api.pdfden.com/api",
});

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use(
  function (config) {
    // Ensure config.headers is initialized
    config.headers = config.headers || {};

    // Retrieve the token from wherever it's stored after login
    const token = sessionStorage.getItem("token"); // Assuming the token is stored in localStorage

    if (token && typeof token === "string") {
      // Set Authorization header directly in config.headers
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, "$axios", { value: instance });
  },
};
