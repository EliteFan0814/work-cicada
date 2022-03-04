import request from '@/utils/request'

export default {
  // 商标检索
  getInfoByName(query, genre = 1) {
    return request({
      url: '/search',
      method: 'post',
      data: { genre, ...query }
    })
  },
  // 商标检索结果的二次过滤
  getInfoFilter(query, suggestKeyword, suggestGenre = 1) {
    return request({
      url: '/search',
      method: 'post',
      data: {
        suggest_genre: suggestGenre,
        suggest_keyword: suggestKeyword,
        ...query
      }
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
