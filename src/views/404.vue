<template>
  <div class="not-found">
    <i class="iconfont icon-404"></i>
    <span>页面未找到 ......</span>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  height: 700px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  .icon-404 {
    font-size: 250px;
  }
  span{
    padding-top: 40px;
    font-size: 20px;
  }
}
</style>
