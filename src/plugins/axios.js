import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  // baseURL: "http://178.16.142.243:5000/api",
  // baseURL: "https://api.pdfden.com/api",
});

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, "$axios", { value: instance });
  },
};
