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
  },
  // 获取商机详情(本公司和非本公司)
  getBusinessInfo(eid, busType = 'main') {
    let url = ''
    if (busType === 'main') {
      url = 'show'
    } else if (busType === 'other') {
      url = 'find_detail'
    }
    return request({
      url: `/business/${url}`,
      method: 'get',
      params: { eid }
    })
  },
  // 获取非本公司商机列表
  getBusinessList(page, size) {
    return request({
      url: '/business/find',
      method: 'get',
      params: { page, size }
    })
  },
  // 已领取商机列表
  getMyBusinessList(page, size) {
    return request({
      url: '/business/my_take_list',
      method: 'get',
      params: { page, size }
    })
  },
  // 商机创建CRM客户
  busCreateCustomer(eid, phones) {
    return request({
      url: '/business/create_customer',
      method: 'post',
      data: { eid, phones }
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
