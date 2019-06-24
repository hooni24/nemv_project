import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* 실행모드에 따라서 API 서버 도메인 결정 */
console.log(process.env.NODE_ENV)
Vue.prototype.$apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : '/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
