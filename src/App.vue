<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'APP'
}
</script>

<style lang="scss">
#app {
  font-family: MicrosoftYaHei-Bold;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  // color: #ccc;
  color: rgba(0, 0, 0, 0.85);
  min-width: 1200px;
  line-height: 1;
  .base-hover {
    &:hover {
      color: #3168d9;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .base-hb {
    &:hover {
      cursor: pointer;
      border: 1px solid #3168d9;
    }
  }
  .base-active {
    color: #3168d9;
    font-weight: bold;
  }
  .pointer {
    &:hover {
      cursor: pointer;
    }
  }
  .omit-1 {
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
