import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
// import '@/assets/iconfont/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局注册基础组件
import '@/utils/globalRegistComp'
// 引入工具函数
import GlobalTools from '@/utils/globaltools'
Vue.use(GlobalTools)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
