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
  getSecondFilter(query, suggestKeyword, suggestGenre = 1) {
    return request({
      url: '/filter_suggest',
      method: 'post',
      data: {
        suggest_genre: suggestGenre,
        suggest_keyword: suggestKeyword,
        ...query
      }
    })
  },
  // 获取商标详细信息
  getDetailInfo(id) {
    return request({
      url: `/detail/${id}`,
      method: 'get'
    })
  },
  // 下载excel
  downloadExcel({ genre, keyword }) {
    return request({
      url: '/search/excel',
      method: 'post',
      data: {
        genre,
        keyword
      }
    })
  },
  // 持有人搜索建议
  ownersSuggest(keyword) {
    return request({
      url: '/suggest/owner',
      method: 'get',
      params: { keyword }
    })
  },
  // 代理机构搜索建议
  agentsSuggest(keyword) {
    return request({
      url: '/suggest/agent',
      method: 'get',
      params: { keyword }
    })
  },
  // 代理机构搜索建议
  addrSuggest(keyword) {
    return request({
      url: '/suggest/addrs',
      method: 'get',
      params: { keyword }
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
