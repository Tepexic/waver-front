import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import "tailwindcss/tailwind.css";

import VueToastify from "vue-toastify";
Vue.use(VueToastify);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
