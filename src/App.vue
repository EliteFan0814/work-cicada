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
$activeColor: #3168d9;
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
      color: $activeColor;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .base-hb {
    &:hover {
      cursor: pointer;
      border: 1px solid $activeColor;
    }
  }
  .base-active {
    color: $activeColor;
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
  .omit-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .flex {
    display: flex;
  }
  // 垂直水平居中
  .flex-sc {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .flex-cc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex-ec {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .flex-bc {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex-ccc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
