import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import "./vee-validate"
import axios from 'axios';
import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL=process.env.NODE_ENV!=='production'?'http://localhost:3000':'http://aaa.cxvh.com'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
