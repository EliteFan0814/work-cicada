import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users',
    method: 'get',
    data
  })
}
// 微信扫码登录
export function wxQRLogin(params) {
  return request({
    url: '/sns/callback/workwx',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
