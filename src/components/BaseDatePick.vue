<template>
  <div class="base-date-pick">
    <i class="el-icon-date" @click="handleShowDatePick"></i>
    <el-date-picker class="date-pick" ref="datePick" v-model="value1" type="daterange" range-separator="至"
      start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'BaseDatePick',
  data() {
    return {
      value1: ''
    }
  },
  methods: {
    handleShowDatePick() {
      if (this.$refs.datePick.$el) {
        this.$refs.datePick.$el.click()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-date-pick {
  cursor: pointer;
  display: inline;
  position: relative;
  .el-icon-date {
    font-size: 14px;
  }
  .el-date-editor {
    border: none !important;;
    position: absolute;
    top: 50%;
    left: -20px;
    padding: 0 !important;
    box-sizing: border-box;
    width: 0px;
    height: 0px;
    ::v-deep i {
      display: none;
    }
    ::v-deep input {
      visibility: hidden;
      display: none;
    }
    ::v-deep span {
      visibility: hidden;
      display: none;
    }
  }
}
</style>
