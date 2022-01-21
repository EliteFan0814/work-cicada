<template>
  <div class="title_box clearfix">
    <a href="javascript:void(0)" class="btn" @click="downLoadFn" v-if="btnShow">下载商标</a>
    <span v-if="types && types=='team'" class="create"><span class="txt">每个人最多可创建2个团队</span><a href="javascript:void(0)"
        class="btn" @click="createFn">创建团队</a></span>
    <span v-if="select=='select'" class="select_box">
      风险精确度 <select v-model="selected" @change="selectFn">
        <option value="1">高</option>
        <option value="2">中</option>
        <option value="3">低</option>
      </select>
    </span>
    <div class="t_input_box" v-if="title=='可加入的团队'">
      <i class="icon icon-search" @click="searchFn"></i><i class="icon icon-close" v-if="clear" @click="clearFn"></i>
      <input type="text" placeholder="团队名称" @keydown.enter="searchFn" class="input" v-model="name" />
    </div>
    <span class="sign"></span>{{title}}
  </div>
</template>

<script>
export default {
  props: ['title', 'clear', 'btnShow', 'select', 'types'],
  data() {
    return {
      name: '',
      selected: '1'
    }
  },
  methods: {
    createFn() {
      this.$emit('createShowFn', true)
    },
    selectFn() {
      this.$emit('selectChangeFn', this.selected)
    },
    searchFn() {
      if (this.name.trim() != '') {
        this.$emit('getNameFn', this.name, true)
      }
    },
    clearFn() {
      this.name = ''
      this.$emit('getNameFn', this.name, false)
    },
    downLoadFn() {
      this.$emit('downLoadFn', '')
    }
  }
}
</script>
<style scoped  lang="scss">
.title_box {
  .select_box {
    float: right;
    color: #a2a7b0;
    font-size: 14px;
    font-weight: normal;
    select {
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      height: 30px;
      line-height: 30px;
      color: #a2a7b0;
      margin-left: 5px;
    }
  }
  line-height: 40px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  .sign {
    display: inline-block;
    width: 4px;
    height: 20px;
    background: #d9001b;
    border-radius: 4px;
    margin: 10px 10px 0 0;
    vertical-align: top;
  }
  .btn {
    float: right;
    height: 32px;
    width: 98px;
    border: 1px solid #e9e9e9;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    border-radius: 4px;
    vertical-align: top;
    margin-top: 3px;
    line-height: 32px;
    &:hover {
      background: #eceef2;
    }
  }
  .create {
    float: right;
    .txt {
      color: #a2a7b0;
      font-size: 12px;
      padding-right: 10px;
      font-weight: normal;
    }
    .btn {
      width: 90px;
      height: 34px;
      line-height: 34px;
      border-radius: 4px;
      background: #d9001b;
      color: #fff;
      text-align: center;
      border: none;
      &:hover {
        background: #c40018;
      }
    }
  }
}
</style>
