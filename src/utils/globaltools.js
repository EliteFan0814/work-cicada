export default {
  install: function(Vue) {
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
    // 深拷贝简单对象
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
  }
}
