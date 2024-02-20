import store from "@/store/index.js";
import VueJwtDecode from "vue-jwt-decode";

export default function checkToken() {
  const token = sessionStorage.getItem("token");
  if (token) {
    const decoded = VueJwtDecode.decode(token);
    const user = decoded.user;
    store.commit("setUser", user);
  }

  return;
}
