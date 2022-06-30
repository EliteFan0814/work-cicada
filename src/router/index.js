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
      // 首页
      {
        path: 'home',
        component: () => import('@/views/Home'),
        name: 'Home',
        meta: { title: '中细软-知了' }
      },
      // 商标查询
      {
        path: 'trademark-search',
        component: () => import('@/views/trademarkSearch/index.vue'),
        name: 'TrademarkSearch',
        meta: { title: '商标查询' }
      },
      {
        path: 'trademark-detail',
        component: () => import('@/views/trademarkDetail/index.vue'),
        name: 'TrademarkDetail',
        meta: { title: '商标详情' }
      },
      // 商标商机
      {
        path: 'trademarkBusiness',
        component: () => import('@/views/trademarkBusiness/index.vue'),
        name: 'TrademarkBusiness',
        meta: { title: '商标商机' }
      },
      // {
      //   path: 'graphics',
      //   component: () => import('@/views/Graphics.vue'),
      //   name: 'Graphics',
      //   meta: { title: '图形查询' }
      // },
      // 商标监控
      {
        path: 'trademark-watch',
        component: () => import('@/views/trademarkWatch/index.vue'),
        name: 'TrademarkWatch',
        meta: { title: '商标监控' }
      },
      // 商标分析 总页面列表
      {
        path: 'trademark-analyse',
        component: () => import('@/views/trademarkAnalyse/index.vue'),
        name: 'TrademarkAnalyse',
        meta: { title: '商标分析' }
      },
      // 商标分析  详情页
      // 普通分析-报告总览
      {
        path: 'analyse-detail',
        name: 'AnalyseDetail',
        component: (resolve) =>
          require(['@/views/trademarkAnalyse/holder/index.vue'], resolve),
        meta: {
          auth: true
        },
        children: [
          // 普通分析-报告总览
          {
            path: 'index',
            name: 'reportReport',
            component: () =>
              import('@/views/trademarkAnalyse/holder/report/index.vue'),
            meta: {
              auth: true,
              tabVal: '0'
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
              auth: true,
              tabVal: '1'
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
              auth: true,
              tabVal: '2'
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
              auth: true,
              tabVal: '3'
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
              auth: true,
              tabVal: '4'
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
              auth: true,
              tabVal: '5'
            }
          }
        ]
      },
      // 商标分析 注册风险分析
      {
        path: 'analyse-risk',
        component: () => import('@/views/trademarkAnalyse/AnalyseRisk.vue'),
        name: 'AnalyseRisk',
        meta: { title: '风险分析' }
      }
      // {
      //   path: 'member-login',
      //   component: () => import('@/views/MemberLogin.vue'),
      //   name: 'MemberLogin',
      //   meta: { title: '会员登录' }
      // }
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
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 处理 vueRouter 3.0.2版本以上出现点击相同路由报错的错误
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}

export default router
