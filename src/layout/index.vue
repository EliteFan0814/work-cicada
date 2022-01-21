<template>
  <div class="layout-wrap">
    <Header></Header>
    <div class="content-wrap">
      <router-view />
    </div>
    <Footer></Footer>
    <BaseLogin></BaseLogin>
  </div>
</template>

<script>
import Header from '@/baseComponents/Header'
import Footer from '@/baseComponents/Footer'
export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.content-wrap {
  min-height: 700px;
}
</style>
