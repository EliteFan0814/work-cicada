<template>
  <div class="class-list">
    <div v-if="showAll" class="all">
      <span :class="{select:true,'select-all':selectAll}" @click="handleSelectAll">全类</span>
    </div>
    <div class="item-list flex">
      <span v-for="item in classList" :key="item.label" :class="{item:true,active:item.select,disabled:item.disabled}"
        @click="handleSelect(item)">{{item.label}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    showAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      classList: [
        { label: '01', select: false, disabled: false },
        { label: '02', select: false, disabled: false },
        { label: '03', select: false, disabled: false },
        { label: '04', select: false, disabled: false },
        { label: '05', select: false, disabled: false },
        { label: '06', select: false, disabled: false },
        { label: '07', select: false, disabled: false },
        { label: '08', select: false, disabled: false },
        { label: '09', select: false, disabled: false },
        { label: '10', select: false, disabled: false },
        { label: '11', select: false, disabled: false },
        { label: '12', select: false, disabled: false },
        { label: '13', select: false, disabled: false },
        { label: '14', select: false, disabled: false },
        { label: '15', select: false, disabled: false },
        { label: '16', select: false, disabled: false },
        { label: '17', select: false, disabled: true },
        { label: '18', select: false, disabled: true },
        { label: '19', select: false, disabled: true },
        { label: '20', select: false, disabled: true },
        { label: '21', select: false, disabled: true }
      ],
      selectAll: false
    }
  },
  watch: {
    classList: {
      handler(newVal) {
        let flagAll = false
        for (let i = 0; i < newVal.length; i++) {
          if (newVal[i].select === false) {
            flagAll = false
            break
          } else {
            flagAll = true
          }
        }
        console.log(flagAll)
        this.selectAll = flagAll
      },
      deep: true
    }
  },
  methods: {
    handleSelect(item) {
      if (!item.disabled) {
        item.select = !item.select
      }
    },
    handleSelectAll() {
      this.selectAll = !this.selectAll
      this.classList.map((item) => {
        item.select = this.selectAll
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.class-list {
  color: rgba(0, 0, 0, 0.65);
  .all {
    margin-bottom: 10px;
    .select {
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #3168d9;
        font-weight: bold;
      }
    }
    .select-all {
      color: #3168d9;
      font-weight: bold;
    }
  }
  .item-list {
    flex-wrap: wrap;
    .item {
      box-sizing: border-box;
      width: 5%;
      cursor: pointer;
      display: inline-block;
      padding: 5px 8px 5px 0;
      &:hover {
        color: #3168d9;
        font-weight: bold;
      }
    }
    .active {
      color: #3168d9;
      font-weight: bold;
    }
    .disabled {
      color: rgba(187, 187, 187, 0.25);
      cursor: not-allowed;
      &:hover {
        color: rgba(187, 187, 187, 0.25);
      }
    }
  }
}
</style>
