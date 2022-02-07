import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: process.env.NODE_ENV === 'development' ? '/v1' : '/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// 请求拦截
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
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
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    // 如果code不为0则说明有报错
    if (res.code !== 0) {
      if (res.msg !== 'OK') {
        const msg = res.msg
        // const subMsg = res.data[0] ? res.data[0] : ''
        Message({
          // message: `${msg}，${subMsg}` || 'Error',
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
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  (error) => {
    console.log('响应拦截出错：' + error) // for debug
    let errMsg = error.message
    if (errMsg.includes('timeout')) {
      errMsg = '请求超时'
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
