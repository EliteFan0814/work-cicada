import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home'),
        name: 'Home',
        meta: { title: 'Home', icon: 'dashboard' }
      },
      {
        path: 'trademarkSearch',
        component: () => import('@/views/TrademarkSearch.vue'),
        name: 'TrademarkSearch',
        meta: { title: '商标查询', icon: 'dashboard' }
      },
      {
        path: 'trademarkDetail',
        component: () => import('@/views/TrademarkDetail/index.vue'),
        name: 'TrademarkDetail',
        meta: { title: '商标详情', icon: 'dashboard' }
      },
      {
        path: 'graphics',
        component: () => import('@/views/Graphics.vue'),
        name: 'Graphics',
        meta: { title: '图形查询', icon: 'dashboard' }
      },
      {
        path: 'trademarkWatch',
        component: () => import('@/views/trademarkWatch/index.vue'),
        name: 'TrademarkWatch',
        meta: { title: '商标监控', icon: 'dashboard' }
      },
      // 商标分析
      {
        path: 'trademarkAnalyse',
        component: () => import('@/views/trademarkAnalyse/index.vue'),
        name: 'TrademarkAnalyse',
        meta: { title: '商标分析', icon: 'dashboard' }
      },
      // {
      //   path: 'trademarkAnalyse/analyseDetail',
      //   component: () =>
      //     import('@/views/trademarkAnalyse/analyseDetail/index.vue'),
      //   name: 'AnalyseDetail',
      //   meta: { title: '商标分析', icon: 'dashboard' }
      // },
      {
        path: 'report/holder/',
        name: 'AnalyseDetail',
        component: (resolve) =>
          require(['@/views/trademarkAnalyse/holder/index.vue'], resolve),
        meta: {
          auth: true
        },
        children: [
          {
            path: 'index',
            name: 'reportReport',
            component: () =>
              import('@/views/trademarkAnalyse/holder/report/index.vue'),
            meta: {
              auth: true
            }
          },
          {
            path: 'risk',
            name: 'reportRisk',
            component: (resolve) =>
              require([
                '@/views/trademarkAnalyse/holder/risk/index.vue'
              ], resolve),
            meta: {
              auth: true
            }
          },
          {
            path: 'brand',
            name: 'reportBrand',
            component: (resolve) =>
              require([
                '@/views/trademarkAnalyse/holder/brand/index.vue'
              ], resolve),
            meta: {
              auth: true
            }
          },
          {
            path: 'agent',
            name: 'reportAgent',
            component: (resolve) =>
              require([
                '@/views/trademarkAnalyse/holder/agent/index.vue'
              ], resolve),
            meta: {
              auth: true
            }
          },
          {
            path: 'owner',
            name: 'reportOwner',
            component: (resolve) =>
              require([
                '@/views/trademarkAnalyse/holder/owner/index.vue'
              ], resolve),
            meta: {
              auth: true
            }
          },
          {
            path: 'goods',
            name: 'reportGoods',
            component: (resolve) =>
              require([
                '@/views/trademarkAnalyse/holder/goods/index.vue'
              ], resolve),
            meta: {
              auth: true
            }
          }
        ]
      },
      // 注册风险报告
      {
        path: 'trademarkAnalyse/AnalyseRisk',
        component: () => import('@/views/trademarkAnalyse/AnalyseRisk.vue'),
        name: 'AnalyseRisk',
        meta: { title: '风险分析', icon: 'dashboard' }
      },
      {
        path: 'memberLogin',
        component: () => import('@/views/MemberLogin.vue'),
        name: 'MemberLogin',
        meta: { title: '会员登录', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 处理 vueRouter 3.0.2版本以上出现点击相同路由报错的错误
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}

export default router
