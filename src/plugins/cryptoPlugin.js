import CryptoJS from "crypto-js";

export default {
  install(Vue) {
    Vue.prototype.$encrypt = (obj) => {
      const secretKey = "mySecretKey123";
      const message = JSON.stringify(obj);
      const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
      return encrypted;
    };
  },
};
