import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import * as VeeValidate from "vee-validate"
import ToggleButton from 'vue-js-toggle-button'

Vue.config.productionTip = false;
Vue.use(ToggleButton)
Vue.use(VeeValidate);
Vue.use(BootstrapVue);

axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
