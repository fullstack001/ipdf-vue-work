import Vue from "vue";
import App from "./App";
import loading from "vuejs-loading-screen";
import Donut from "vue-css-donut-chart";
import "vue-css-donut-chart/dist/vcdonut.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Vuelidate from "vuelidate";

import i18n from "./i18n";

// router setup
import router from "./routes/routes";

//vuex setup
import store from "./store/index.js";
// Plugins
import axios from "./plugins/axios";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

Vue.prototype.$Chartist = Chartist;

Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(axios);
Vue.use(Donut);
Vue.use(VueSweetalert2);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

Vue.use(loading, {
  size: 5,
  icon_color: "white",
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  i18n,
  store,
  render: (h) => h(App),
  // data: {
  //   Chartist: Chartist,
  // },
});
