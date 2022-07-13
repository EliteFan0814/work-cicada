import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // get token from cookie

const whiteList = ['/login', '/home', '/trademark-business'] // no redirect whitelist
// const whiteList = ['/login', '/home', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 设置page title
  document.title = to.meta.title
  // 判断用户是否登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登录，重定向到首页
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 如果请求路由存在于白名单，则直接进入相应路由
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 检测到未登录，将当前地址存储为重定向地址，然后跳转登录页面
      next({ path: '/', query: { redirect: to.fullPath } })
    }
    // if (whiteList.indexOf(to.path) !== -1) {
    //   // in the free login whitelist, go directly
    //   next()
    // } else {
    //   // other pages that do not have permission to access are redirected to the login page.
    //   next(`/login?redirect=${to.path}`)
    // }
  }
})

router.afterEach(() => {
  // finish progress bar
})
