import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VeeValidate from 'vee-validate';
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(VeeValidate)

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
