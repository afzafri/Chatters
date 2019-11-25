import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
