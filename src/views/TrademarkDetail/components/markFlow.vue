<template>
  <div class="base-info">
    <ftitle title="商标流程" time more @timeClass="timeClass"> </ftitle>
    <div v-if="isTime" class="detail-wrap">
      <!-- <div class="rol">
        <fcol name="2009-10-27" :value="testValue" :copy="false">
          <div class="value-wrap flex-cc">
            <div>
              <span>申请程序</span>
              <span>申请程序</span>
            </div>
            <div>1258</div>
            <div>公告页</div>
          </div>
        </fcol>
      </div> -->
      <div v-for="item in flowsInfo" :key="item.id" class="rol">
        <fcol
          :name="item.created_at"
          :value="[{ value: item.content }]"
          :copy="false"
        ></fcol>
      </div>
    </div>
    <div v-else class="detail-wrap">
      <div class="rol">
        <fcol name="申请程序" value="中细软" :copy="false"></fcol>
      </div>
      <div class="rol">
        <fcol name="驳回通知" :value="testValue" :copy="false"></fcol>
      </div>
      <div class="rol">
        <fcol name="初审公告" :value="testValue" :copy="false"></fcol>
      </div>
    </div>
  </div>
</template>
<script>
import fcol from './fcol.vue'
import ftitle from './ftitle.vue'

export default {
  name: 'markFlow',
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
      testValue: [
        {
          value: '中细软'
        },
        {
          value: '中细软'
        },
        {
          value: '中细软'
        }
      ],
      ownerInfo: {},
      flowsInfo: [],
      isTime: true
    }
  },
  watch: {
    detailInfo(newVal) {
      this.ownerInfo = newVal.owner
      this.flowsInfo = newVal.flows.map((item) => {
        item.created_at = item.created_at
          ? this.$dayjs(item.created_at).format('YYYY-MM-DD')
          : '/'
        return item
      })
    }
  },
  methods: {
    timeClass(value) {
      if (value === 'more') {
        this.isTime = false
      } else if (value === 'time') {
        this.isTime = true
      }
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
