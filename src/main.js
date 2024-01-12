// =========================================================
// * Vue Material Dashboard - v1.5.1
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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
import store from "./store";

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
  render: (h) => h(App),
  store,
  router,
  i18n,
  // data: {
  //   Chartist: Chartist,
  // },
});
