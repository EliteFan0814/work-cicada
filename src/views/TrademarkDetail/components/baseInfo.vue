<template>
  <div class="base-info">
    <ftitle title="基本信息"></ftitle>
    <div class="detail-wrap">
      <div class="rol">
        <fcol
          width="70"
          name="商标名称"
          :value="[{ value: trademarkName }]"
        ></fcol>
        <fcol width="30" name="商标形式" :value="[{value:trademarkForm}]"></fcol>
      </div>
      <div class="rol">
        <fcol width="30" name="申请号" :value="[{ value: applyId }]"></fcol>
        <fcol width="40" name="国际分类" :value="[{ value: category }]"></fcol>
        <fcol width="30" name="申请方式" :value="testValue"></fcol>
      </div>
      <div class="rol">
        <fcol width="30" name="法律状态" :value="[{ value: status }]"></fcol>
        <fcol width="40" name="商标流程" :value="testValue"></fcol>
        <fcol
          width="30"
          name="商标类型"
          :value="[{ value: $transMarkClass(trademarkClass) }]"
        ></fcol>
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
        <fcol
          width="100"
          name="地址"
          :value="[{ value: ownerInfo.addr_cn }]"
        ></fcol>
      </div>
      <div class="rol">
        <fcol
          width="70"
          name="申请日期"
          :value="[{ value: createDate }]"
        ></fcol>
        <fcol
          width="30"
          name="国际注册日期"
          :value="testValue"
        ></fcol>
      </div>
      <div class="rol">
        <fcol
          width="30"
          name="初审公告"
          link="cc.com"
          :sub="preBoard"
          :value="[{ value: preDate }]"
        ></fcol>
        <fcol
          width="40"
          name="异议截止日"
          :value="[{ value: deadlineDate }]"
        ></fcol>
        <fcol width="30" name="后期指定日期 " :value="testValue"></fcol>
      </div>
      <div class="rol">
        <fcol
          width="30"
          name="注册公告"
          link="xx.com"
          :sub="registBoard"
          :value="[{ value: registDate }]"
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
          :value="[{ value: agentName }]"
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
      trademarkName: '暂无信息', // 商标名称
      trademarkForm: '暂无信息', // 商标形式
      applyId: '暂无信息', // 申请号
      category: '暂无信息', // 国际分类
      status: '暂无信息', // 法律状态
      trademarkClass: '暂无信息', // 商标类型
      createDate: '/', // 申请日期
      preDate: '/', // 初审日期
      registDate: '/', // 注册日期
      deadlineDate: '/', // 异议截止日期
      preBoard: '', // 初审公告期
      registBoard: '', // 注册公告期
      agentName: '暂无信息', // 代理机构
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
      this.flowsInfo = newVal.flowsInfo
      // 商标类型
      this.trademarkClass = this.ownerInfo.genre
      // 商标名称
      this.trademarkName = newVal.name
      // 商标形式
      this.trademarkForm = this.$transStatus(newVal.status)
      // 申请号
      this.applyId = newVal.reg_id
      // 国际分类
      this.category = newVal.category
      // 法律状态
      this.status = this.$transStatus(newVal.status)
      // 代理机构
      this.agentName = newVal.agent_name
      // 处理申请日期
      this.createDate = newVal.date_app
        ? this.$dayjs(newVal.date_app).format('YYYY-MM-DD')
        : '/'
      // 处理初审日期
      this.preDate = newVal.date_pre
        ? this.$dayjs(newVal.date_pre).format('YYYY-MM-DD')
        : '/'
      // 处理注册日期
      this.registDate = newVal.date_reg
        ? this.$dayjs(newVal.date_reg).format('YYYY-MM-DD')
        : '/'
      // 处理异议截止日期
      this.deadlineDate = newVal.date_pre
        ? this.$dayjs(this.preDate).add(90, 'day').format('YYYY-MM-DD')
        : '/'
      // 初审公告期 注册公告期
      this.preBoard = newVal.issue_pre
      this.registBoard = newVal.issue_reg
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
