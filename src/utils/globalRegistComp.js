import Vue from 'vue'

globalRegistCompCustom(require.context('@/components', true, /.vue$/))

// 把自定义组件进行全局注册
function globalRegistCompCustom(context) {
  context.keys().forEach((item) => {
    const component = context(item)
    const ctrl = component.default || component
    const a = ctrl.name
    const b = ctrl
    // 全局注册组件
    Vue.component(a, b)
  })
}
