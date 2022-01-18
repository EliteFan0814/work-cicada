<template>
<nav class="notary-content-nav">
  <span btn @click="changePageFn('content')" :class="{cur: $store.state.notaryNav  == 'content'}" class="link" >信息</span>
  <span btn @click="changePageFn('speed')" :class="{cur: $store.state.notaryNav  == 'speed'}" class="link" >进度</span>
  <span btn @click="changePageFn('mail')" :class="{cur: $store.state.notaryNav  == 'mail'}" class="link" >邮寄</span>
  <span btn @click="changePageFn('bill')" :class="{cur: $store.state.notaryNav  == 'bill'}" class="link" >发票</span>
  <span btn @click="changePageFn('refund')" :class="{cur: $store.state.notaryNav  == 'refund'}" class="link" >退款</span>
</nav>
</template>

<script>
export default {
  methods: {
    changePageFn (type) {
      this.$store.commit('notaryNavStore', type )
    }
  },
  data () {
    return {
      nav: 'content'
    }
  }
}


</script>

<style lang="scss" scoped >

@import "@/assets/sass/base.scss";

.notary-content-nav{
  @include flex(both, center);
  position: relative;
  width: calc(100% - 30px); margin-left: 15px;
  &:before{
    content: '';
    display: block; position: absolute;
    bottom:1px; left:0px; width: 100%; height:1px; z-index:2;
    background-color: $border;
  }
  .link{
    display: block; text-align: center; position: relative;
    width: 20%; line-height: 40px; 
    border-bottom:2px solid rgba(255, 255, 255, 0);
    &.cur{
      font-weight: bold;
      z-index:5;
      border-color:$red2; color:$red2;
    }
    &:hover{
      color:$red2;
    }
  }
}
</style>