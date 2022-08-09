// api请求地址
export const apiRequestBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://zhiliao-api-test.ipfool.com/v1'
    : 'https://zhiliao-api.ipfool.com/v1'

// 微信授权登录重定向地址
export const wxAuthLoginUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://iknow.d.gbicom.com/#/home'
    : 'http://iknow.d.gbicom.com/#/home'

export const getWxLoginConfig = function() {
  // 开发环境微信授权登录配置文件
  const devWxLoginConfig = {
    appid: 'wxdf237e7c63de94bb',
    agentid: '1000039',
    // 微信重定向地址源码（源码 编码请同时修改）
    redirect_uri_original: 'http://iknow-dev.d.gbicom.com/#/home',
    state: '',
    href: ''
  }

  // 生产环境微信授权登录配置文件
  const productionWxLoginConfig = {
    appid: 'wxdf237e7c63de94bb',
    agentid: '1000032',
    // 微信重定向地址源码（源码 编码请同时修改）
    redirect_uri_original: 'http://iknow.d.gbicom.com/#/home',
    state: '',
    href: ''
  }

  if (process.env.NODE_ENV === 'development') {
    return devWxLoginConfig
  } else {
    return productionWxLoginConfig
  }
}
export default {
  install: function(Vue) {
    // 常量 下载地址baseUrl
    Object.defineProperty(Vue.prototype, '$downloadBaseUrl', {
      // value: 'http://10.10.102.23:8010/'
      value: apiRequestBaseUrl
    })
    // 常量 微信重定向地址源码（源码 编码请同时修改）
    Object.defineProperty(Vue.prototype, '$redirectUriOriginal', {
      value: wxAuthLoginUrl
    })
    // 生成随机数id
    Object.defineProperty(Vue.prototype, '$createRandomId', {
      value: function() {
        return Number(Math.random().toString().slice(2) + Date.now()).toString(
          36
        )
      }
    })
    // 深拷贝简单对象
    Object.defineProperty(Vue.prototype, '$deepCopy', {
      value: function(copyObj) {
        return JSON.parse(JSON.stringify(copyObj))
      }
    })
    // 将一个数组分为多个数组
    Object.defineProperty(Vue.prototype, '$sliceArray', {
      value: function(targetArray, number) {
        const page = Math.ceil(targetArray.length / number)
        const returnArr = []
        for (let i = 0; i < page; i++) {
          returnArr[i] = targetArray.slice(i * number, (i + 1) * number)
        }
        return returnArr
      }
    })
    // 上传图片
    Object.defineProperty(Vue.prototype, '$getImgUrl', {
      value: function(imgFile) {
        return new Promise(function(resolve, reject) {
          if (!/image\/\w+/.test(imgFile.type)) {
            reject(new Error('请上传图片类型文件'))
          }
          const reader = new FileReader()
          reader.readAsDataURL(imgFile)
          reader.onload = function(e) {
            resolve(reader.result)
          }
          reader.onerror = function(error) {
            reject(error)
          }
        })
      }
    })
    // 通过url地址下载
    Object.defineProperty(Vue.prototype, '$downloadByUrl', {
      value: function(baseUrl, url) {
        const aLink = document.createElement('a') // 创建a链接
        aLink.style.display = 'none'
        aLink.href = '' + baseUrl + url
        // aLink.download = name
        document.body.appendChild(aLink)
        aLink.click()
        document.body.removeChild(aLink) // 点击完成后记得删除创建的链接
      }
    })
    // 商标法律状态
    Object.defineProperty(Vue.prototype, '$transStatus', {
      value: function(status) {
        switch (status) {
          case 100:
            return '已消亡'
          case 101:
            return '待审中'
          case 102:
            return '已注册'
          case 103:
            return '已驳回'
          case 104:
            return '已初审'
          default:
            return '暂无信息'
        }
      }
    })
    // 商标类型
    Object.defineProperty(Vue.prototype, '$transMarkClass', {
      value: function(value) {
        switch (value) {
          case 1:
            return '普通'
          case 2:
            return '集体'
          case 3:
            return '证明'
          case 4:
            return '特殊'
          case 5:
            return '国际'
          case 6:
            return '驰名'
          case 7:
            return '著名'
          case 8:
            return '立体'
          case 9:
            return '颜色'
          case 10:
            return '地理'
          case 11:
            return '声音'
          default:
            return '暂无信息'
        }
      }
    })
    // 商标形式
    Object.defineProperty(Vue.prototype, '$transForm', {
      value: function(value) {
        switch (value) {
          // case 0001:
          //   return '文字'
          // case 0010:
          //   return '图形'
          // case 0100:
          //   return '声音'
          case 1000:
            return '气味'
          default:
            return '暂无信息'
        }
      }
    })
  }
}
