// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      return (state.user = payload);
    },
  },
  actions: {
    setUser(context, payload) {
      context.commit("setUser", payload);
    },
  },
});

export default store;
