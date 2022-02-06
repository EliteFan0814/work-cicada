import request from '@/utils/request'

export default {
  getWatchList(query) {
    return request({
      url: '/monitor/list',
      method: 'get',
      params: query
    })
  },
  watchListAdd(data) {
    return request({
      url: '/monitor/add',
      method: 'post',
      data: data
    })
  },
  watchListDel(id) {
    return request({
      url: '/monitor/del',
      method: 'post',
      data: { id }
    })
  },
  watchListDetail(id) {
    return request({
      url: '/monitor/show',
      method: 'get',
      params: { id }
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
