<template>
  <div class="base-search-class">
    <ul v-if="type==='default'">
      <li v-for="item in searchList" :key="item.value" :class="{active:item.value === activeValue}"
        @click="handleSelect(item.value)">{{item.label}}</li>
    </ul>
    <ul v-if="type==='home'">
      <li v-for="item in searchList" :key="item.value"
        :class="{'homi-li':true,'active-home':item.value === activeValue}" @click="handleSelect(item.value)">
        {{item.label}}</li>
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
          { label: '智能查询', value: 'name' },
          { label: '申请号', value: 'code' },
          { label: '申请人', value: 'owner' },
          { label: '代理机构', value: 'agent' }
        ]
      }
    },
    type: {
      type: String,
      default: 'default'
    },
    outActiveValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeValue: 'name'
    }
  },
  watch: {
    outActiveValue(newVal) {
      this.activeValue = newVal
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
    .homi-li {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: normal;
      color: #fff;
      opacity: 0.75;
    }
    .active-home {
      font-weight: bold;
      background-image: -webkit-linear-gradient(
        left,
        #4af175,
        #4fe3c0,
        #51dbee
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      &::after {
        content: '';
        margin-top: 5px;
        display: block;
        width: 40px;
        height: 1px;
        background-image: linear-gradient(
            120deg,
            #4af175 1%,
            #4fe3c0 50%,
            #51dbee 100%
          ),
          linear-gradient(#f7f7f7, #f7f7f7);
        background-blend-mode: normal, normal;
        opacity: 0.7;
      }
    }
  }
}
</style>
