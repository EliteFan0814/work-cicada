import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'reset-css'
import './assets/css/reset.css'
import './assets/css/fonts.css'
import './assets/sass/common.scss'
// import '@/assets/iconfont/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局注册基础组件
import '@/utils/globalRegistComp'
// 引入工具函数
import GlobalTools from '@/utils/globaltools'
import * as echarts from 'echarts'
Vue.use(GlobalTools)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
