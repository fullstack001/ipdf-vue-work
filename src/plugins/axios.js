import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/api",
  // baseURL: "https://api.pdfden.com/api",
});

export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, "$axios", { value: instance });
  },
};
