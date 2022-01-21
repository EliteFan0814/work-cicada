export default {
  methods: {
    // 图片错误
    imgErrFn(el) {
      el.target.setAttribute('src', require('@/assets/img/img-err.png'))
    }
  }
}
