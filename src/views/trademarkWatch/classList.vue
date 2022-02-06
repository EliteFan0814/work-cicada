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
    },
    outSelectList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      classList: [
        { label: '01', value: 1, select: false, disabled: false },
        { label: '02', value: 2, select: false, disabled: false },
        { label: '03', value: 3, select: false, disabled: false },
        { label: '04', value: 4, select: false, disabled: false },
        { label: '05', value: 5, select: false, disabled: false },
        { label: '06', value: 6, select: false, disabled: false },
        { label: '07', value: 7, select: false, disabled: false },
        { label: '08', value: 8, select: false, disabled: false },
        { label: '09', value: 9, select: false, disabled: false },
        { label: '10', value: 10, select: false, disabled: false },
        { label: '11', value: 11, select: false, disabled: false },
        { label: '12', value: 12, select: false, disabled: false },
        { label: '13', value: 13, select: false, disabled: false },
        { label: '14', value: 14, select: false, disabled: false },
        { label: '15', value: 15, select: false, disabled: false },
        { label: '16', value: 16, select: false, disabled: false },
        { label: '17', value: 17, select: false, disabled: false },
        { label: '18', value: 18, select: false, disabled: false },
        { label: '19', value: 19, select: false, disabled: false },
        { label: '20', value: 20, select: false, disabled: false },
        { label: '21', value: 21, select: false, disabled: false },
        { label: '22', value: 22, select: false, disabled: false },
        { label: '23', value: 23, select: false, disabled: false },
        { label: '24', value: 24, select: false, disabled: false },
        { label: '25', value: 25, select: false, disabled: false },
        { label: '26', value: 26, select: false, disabled: false },
        { label: '27', value: 27, select: false, disabled: false },
        { label: '28', value: 28, select: false, disabled: false },
        { label: '29', value: 29, select: false, disabled: false },
        { label: '30', value: 30, select: false, disabled: false },
        { label: '31', value: 31, select: false, disabled: false },
        { label: '32', value: 32, select: false, disabled: false },
        { label: '33', value: 33, select: false, disabled: false },
        { label: '34', value: 34, select: false, disabled: false },
        { label: '35', value: 35, select: false, disabled: false },
        { label: '36', value: 36, select: false, disabled: false },
        { label: '37', value: 37, select: false, disabled: false },
        { label: '38', value: 38, select: false, disabled: false },
        { label: '39', value: 39, select: false, disabled: false },
        { label: '40', value: 40, select: false, disabled: false },
        { label: '41', value: 41, select: false, disabled: false },
        { label: '42', value: 42, select: false, disabled: false },
        { label: '43', value: 43, select: false, disabled: false },
        { label: '44', value: 44, select: false, disabled: false },
        { label: '45', value: 45, select: false, disabled: false }
      ],
      selectList: this.outSelectList,
      selectAll: false
    }
  },
  watch: {
    outSelectList: {
      handler(newVal) {
        this.classList.map((item) => {
          if (newVal.includes(item.value)) {
            item.select = true
          } else {
            item.select = false
          }
        })
      },
      deep: true
    },
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
      this.filterSelected()
      this.$emit('classChange', this.selectList)
    },
    handleSelectAll() {
      this.selectAll = !this.selectAll
      this.classList.map((item) => {
        item.select = this.selectAll
      })
      this.filterSelected()
      this.$emit('classChange', this.selectList)
    },
    // 过滤出结果
    filterSelected() {
      const temp = []
      this.classList.map((item) => {
        if (item.select) {
          temp.push(item.value)
        }
      })
      this.selectList = temp
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
