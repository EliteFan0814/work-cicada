import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'

// export const url = window.location.href
export const url = 'http://tools.zxripr.com/'

const testOrgId = '1'
const testToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlbXAiLCJpYXQiOjE2NDI5ODc5NDUsImV4cCI6MTY0MzAzMTE0NSwiZW1wTm8iOiJYUi1CSi0wMDkyNyIsImRldmljZSI6IjEiLCJkYXRhIjp7ImVtcG5vIjoiWFItQkotMDA5MjciLCJkZXZpY2UiOiIxIn19.C27yUngz7RPdD1KUZu_jUgTZCICuoGBpOLRpGa1exeUjXqnD28TeDUhXHLftQoQy2Y5lTzCgGtOnok8UNDB2JIRvqJT2OAt-xY7MpH2lajcusDCaWP0O6DavjexlGfI8xT4ZQdDmVEgZFHCJHFPBu8wdauW9JZYad-Dqdcl88XoBNDH9NKcOI9pnqAXRfX-QHWvDRpr0OZY3fp8USvgtqst4zCi2pMQGh6O5J4GBvPfj9CScQCbxTebZJ7_bPCyJV0vIrvCPr6mo-FXSeESG6k_ghilnSycjyAWR_cWU1geVy97NbwEQSVcRH-CkEcfTMtHFjflz9uLrHY9axRfQVw'

export let apikey = ''
export let requestUrl = ''
if (url.indexOf('zxripr.com') >= 0) {
  apikey = 'ZlEqSzeQo1xEo0W3Rqh7t3x8d77UwR3O'
  requestUrl = 'https://kong.gbicom.com:8443/empsaas'
} else {
  requestUrl = 'http://kong.d.gbicom.com/empsaas'
  apikey = '592255fd1ca345118376d7bef6e19202'
}

export const api = () => {
  const header = {
    apikey: apikey,
    // orgId: Cookies.get('orgid') ? Cookies.get('orgid') : '',
    // Authorization: Cookies.get('token'),
    orgId: testOrgId,
    Authorization: testToken,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  const instance = axios.create({
    baseURL: requestUrl,
    headers: header
  })
  instance.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    },
    (error) => {
      if (error.response.status && error.response.status != 401) {
        alert('系统出错，请稍后再试')
      }
      return Promise.reject(error.response.status)
    }
  )
  return {
    api: instance,
    post(url, data) {
      return this.api({
        method: 'post',
        url,
        data: qs.stringify(data)
      })
    },
    put(url, data) {
      return this.api({
        method: 'put',
        url,
        params: data
      })
    },
    delete(url, data) {
      return this.api({
        method: 'delete',
        url,
        params: data
      })
    },
    get(url, data, api = '') {
      if (api == '') {
        return this.api({
          method: 'get',
          url,
          params: data
        })
      } else {
        return this.api({
          method: 'get',
          url,
          params: data,
          headers: {
            apikey: '592255fd1ca345118376d7bef6e19202'
          }
        })
      }
    },
    upload(url, data) {
      return this.api({
        method: 'post',
        url,
        data: data
      })
    },
    uploadNew(url, data) {
      return this.api({
        method: 'post',
        url,
        data: data
      })
    },
    getDown(data) {
      return this.api({
        method: 'post',
        url: '/user/download/save',
        data: qs.stringify(data)
      })
    }
  }
}
export function noRepeat(arr) {
  if (arr.length) {
    var n = [arr[0]]
    for (var i = 1, len = arr.length; i < len; i++) {
      if (arr.indexOf(arr[i]) == i) {
        n.push(arr[i])
      }
    }
    return n
  }
  return arr
}
export function formatDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}
export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function downJs(url) {
  const a = document.createElement('a')
  a.href = url
  a.setAttribute('target', '_blank')
  document.querySelector('body').append(a)
  a.onclick = (e) => {
    e.stopPropagation()
  }
  a.click()
  document.querySelector('body').removeChild(a)
}

export function clone(target, map = new Map()) {
  if (typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}

export const kindsList = [
  { category: 1, name: '01类-化学原料' },
  { category: 2, name: '02类-颜料油漆' },
  { category: 3, name: '03类-日化用品' },
  { category: 4, name: '04类-燃料油脂' },
  { category: 5, name: '05类-医药' },
  { category: 6, name: '06类-金属材料' },
  { category: 7, name: '07类-机械设备' },
  { category: 8, name: '08类-手工器械' },
  { category: 9, name: '09类-科学仪器' },
  { category: 10, name: '10类-医疗器械' },
  { category: 11, name: '11类-灯具空调' },
  { category: 12, name: '12类-运输工具' },
  { category: 13, name: '13类-军火烟火' },
  { category: 14, name: '14类-珠宝钟表' },
  { category: 15, name: '15类-乐器' },
  { category: 16, name: '16类-办公用品' },
  { category: 17, name: '17类-橡胶制品' },
  { category: 18, name: '18类-皮革皮具' },
  { category: 19, name: '19类-建筑材料' },
  { category: 20, name: '20类-家具' },
  { category: 21, name: '21类-厨房洁具' },
  { category: 22, name: '22类-绳网袋篷' },
  { category: 23, name: '23类-纱线丝' },
  { category: 24, name: '24类-布料床单' },
  { category: 25, name: '25类-服装鞋帽' },
  { category: 26, name: '26类-钮扣拉链' },
  { category: 27, name: '27类-地毯席垫' },
  { category: 28, name: '28类-健身器材' },
  { category: 29, name: '29类-食品' },
  { category: 30, name: '30类-方便食品' },
  { category: 31, name: '31类-饲料种籽' },
  { category: 32, name: '32类-啤酒饮料' },
  { category: 33, name: '33类-酒' },
  { category: 34, name: '34类-烟草烟具' },
  { category: 35, name: '35类-广告销售' },
  { category: 36, name: '36类-金融物管' },
  { category: 37, name: '37类-建筑修理' },
  { category: 38, name: '38类-通讯服务' },
  { category: 39, name: '39类-运输贮藏' },
  { category: 40, name: '40类-材料加工' },
  { category: 41, name: '41类-教育娱乐' },
  { category: 42, name: '42类-网站服务' },
  { category: 43, name: '43类-餐饮住宿' },
  { category: 44, name: '44类-医疗园艺' },
  { category: 45, name: '45类-社会服务' }
]

export let defaultUrl = ''
export let nameUrl = ''
if (url.indexOf('zxripr.com') >= 0) {
  defaultUrl = 'https://kong.gbicom.com:8443'
  // nameUrl = "https://kong.gbicom.com:8443/qiming";
  nameUrl = 'http://kong.d.gbicom.com/qiming'
} else {
  defaultUrl = 'http://kong.d.gbicom.com'
  nameUrl = 'http://kong.d.gbicom.com/qiming-dev'
  // defaultUrl =  'http://empsaas.local'
}

export function cnzzFn(category, action, label) {
  if (window._czc) {
    window._czc.push(['_trackEvent', category, action, label])
    console.log(category, action, label)
  }
}
