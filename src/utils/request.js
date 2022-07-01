import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const apikey = '592255fd1ca345118376d7bef6e19202'
// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '/v1' : 'http://kong.d.gbicom.com/iknow/v1', // url = base url + request url
  baseURL:
    process.env.NODE_ENV === 'development'
      ? '/v1'
      : 'http://10.10.102.23:8010/v1', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 发送请求前配置请求
    // config.headers.apikey = apikey
    if (store.getters.token) {
      // 让每个请求都附带token
      // config.headers['token'] = getToken()
      config.headers.token = getToken()
    }
    return config
  },
  (error) => {
    // 请求错误处理
    console.log('请求拦截出错：', error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 如果code不为0则说明有报错
    if (res.code !== 0) {
      // token过期失效
      if (res.code === 10003) {
        store.dispatch('logout').then(() => {
          Message({
            message: '请重新登录',
            type: 'warn',
            duration: 3 * 1000
          })
        })
      } else if (res.msg !== 'OK') {
        const msg = res.msg
        Message({
          message: `${msg}` || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res.data
    }
  },
  (error) => {
    console.log('响应拦截出错：' + error) // for debug
    let errMsg = error.message
    if (errMsg.includes('timeout')) {
      errMsg = '请求超时'
    } else if (errMsg.includes('500')) {
      errMsg = '服务器错误，请稍后再试'
    }
    Message({
      message: errMsg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
