<template>
  <div class="base-search-class">
    <ul>
      <li
        v-for="item in searchList"
        :key="item.value"
        :class="{active:item.value === activeValue}"
        @click="handleSelect(item.value)"
      >{{item.label}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'BaseSearchClass',
  props: {
    searchList: {
      type: Array,
      default() {
        return [
          { label: '智能查询', value: 'ai' },
          { label: '申请号', value: 'applyId' },
          { label: '申请人', value: 'applier' },
          { label: '代理机构', value: 'agent' }
        ]
      }
    }
  },
  data() {
    return {
      activeValue: 'ai'
    }
  },
  methods: {
    handleSelect(value) {
      this.activeValue = value
      this.$emit('selectClass', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.base-search-class {
  ul {
    display: flex;
    padding: 5px;
    li {
      font-size: 14px;
      letter-spacing: 0px;
      color: #999999;
      margin-right: 20px;
      font-weight: bold;
      cursor: pointer;
    }
    .active {
      color: #3168d9;
    }
  }
}
</style>
