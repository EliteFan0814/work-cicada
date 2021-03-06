import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局注册基础组件
import '@/utils/globalRegistComp'
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
