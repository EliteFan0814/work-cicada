<template>
  <div class="layout-wrap">
    <Header></Header>
    <div class="content-wrap">
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
