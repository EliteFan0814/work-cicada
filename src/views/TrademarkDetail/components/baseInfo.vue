<template>
  <div class="base-info">
    <ftitle title="基本信息"></ftitle>
    <div class="detail-wrap">
      <div class="rol">
        <fcol
          width="70"
          name="商标名称"
          :value="[{ value: detailInfo.name }]"
        ></fcol>
        <fcol width="30" name="商标形式" :value="testValue"></fcol>
      </div>
      <div class="rol">
        <fcol width="30" name="申请号" :value="testValue"></fcol>
        <fcol
          width="40"
          name="国际分类"
          :value="[{ value: detailInfo.category }]"
        ></fcol>
        <fcol width="30" name="申请方式" :value="testValue"></fcol>
      </div>
      <div class="rol">
        <fcol width="30" name="法律状态" :value="testValue"></fcol>
        <fcol width="40" name="商标流程" :value="testValue"></fcol>
        <fcol width="30" name="商标类型" :value="testValue"></fcol>
      </div>
      <div class="rol">
        <fcol
          width="100"
          name="申请人"
          copy
          qiye
          baidu
          :value="[{ value: ownerInfo.name_cn }]"
        ></fcol>
      </div>
      <div class="rol">
        <fcol width="100" name="地址" :value="[{ value: ownerInfo.addr_cn }]"></fcol>
      </div>
      <div class="rol">
        <fcol width="70" name="申请日期" :value="testValue"></fcol>
        <fcol width="30" name="国际注册日期" :value="testValue"></fcol>
      </div>
      <div class="rol">
        <fcol
          width="30"
          name="初审公告"
          link="cc.com"
          sub="1294"
          :value="testValue"
        ></fcol>
        <fcol width="40" name="异议截止日" :value="testValue"></fcol>
        <fcol width="30" name="后期指定日期 " :value="testValue"></fcol>
      </div>
      <div class="rol">
        <fcol
          width="30"
          name="注册公告"
          link="xx.com"
          sub="1294"
          :value="testValue"
        ></fcol>
        <fcol width="40" name="专用权期限" :value="testValue"></fcol>
        <fcol width="30" name="优先权日期" :value="testValue"></fcol>
      </div>
      <div class="rol">
        <fcol
          name="代理机构"
          copy
          qiye
          baidu
          :valueLink="true"
          :value="[{ value: detailInfo.agent_name }]"
        ></fcol>
      </div>
    </div>
  </div>
</template>
<script>
import fcol from './fcol.vue'
import ftitle from './ftitle.vue'

export default {
  components: {
    fcol,
    ftitle
  },
  props: {
    detailInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      ownerInfo: {},
      flowsInfo: [],
      testValue: [
        {
          value: 'xxxxx'
        }
      ]
    }
  },
  watch: {
    detailInfo(newVal) {
      this.ownerInfo = newVal.owner
      this.flowsInfo = newVal.flows
    }
  }
}
</script>
<style lang="scss" scoped>
.base-info {
  padding: 10px;
  background-color: #fff;

  .detail-wrap {
    border-top: 1px solid #e8e8e8;
    margin-left: 10px;
    .rol {
      display: flex;
      border-bottom: 1px dashed #e8e8e8;
    }
  }
}
</style>
