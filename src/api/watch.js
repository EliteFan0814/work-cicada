import request from '@/utils/request'

export default {
  getWacthList(query) {
    return request({
      url: '/monitor/list',
      method: 'get',
      params: query
    })
  }
}
// 按商标名检索
// export function getInfoByName(query) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: query
//   })
// }
