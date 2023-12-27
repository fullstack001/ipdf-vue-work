// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    result: null,
  },
  mutations: {
    setresult(state, payload) {
      return (state.result = payload.amount);
    },
  },
  actions: {
    setresult(context, payload) {
      context.commit("setresult", payload);
    },
  },
});

export default store;
