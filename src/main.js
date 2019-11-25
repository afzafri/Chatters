import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css'
import VueChatScroll from 'vue-chat-scroll'
import moment from 'moment'

Vue.use(VueChatScroll)
Vue.prototype.moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
