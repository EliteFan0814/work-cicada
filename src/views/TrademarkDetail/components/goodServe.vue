<template>
  <div class="base-info">
    <ftitle
      title="商品服务"
      duan
      lie
      @showSet="handleShowSet"
      @activeGroup="activeGroup"
      @activeEn="activeEn"
    >
    </ftitle>
    <div class="detail-wrap">
      <div class="rol">
        <fcol
          name="申请群组"
          :valueLink="false"
          :value="applyCodeList"
          :copy="false"
        >
        </fcol>
      </div>
      <div v-if="activeGroupVal" class="rol">
        <fcol
          name="未审群组"
          :valueLink="true"
          :value="groupList"
          :isList="isList"
          :copy="false"
        ></fcol>
      </div>
      <div class="rol">
        <fcol
          name="商品服务"
          :valueLink="false"
          :value="goodServeList"
          :isList="isList"
          :copy="false"
        ></fcol>
      </div>
      <div v-if="activeEnVal" class="rol">
        <fcol
          name="英文翻译"
          :value="testValue"
          :isList="isList"
          :copy="false"
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
      applyCodeList: [], // 申请群组
      goodServeList: [], // 商品服务
      groupList: [
        {
          value: 'xxxxx'
        },
        {
          value: 'xxxxx'
        },
        {
          value: 'xxxxx'
        },
        {
          value: 'xxxxx'
        }
      ],
      testValue: [
        {
          value: 'xxxxx',
          subText: '具体说明xxx'
        },
        {
          value: 'xxxxx',
          subText: '具体说明xxx'
        },
        {
          value: 'xxxxx',
          subText: '具体说明xxx'
        },
        {
          value: 'xxxxx',
          subText: '具体说明xxx'
        },
        {
          value: 'xxxxx',
          subText: '具体说明xxx'
        }
      ],
      isList: false,
      activeGroupVal: false,
      activeEnVal: false
    }
  },
  watch: {
    detailInfo(newVal) {
      this.applyCodeList = []
      this.goodServeList = []
      newVal.items = newVal.items ? newVal.items : []
      newVal.items.map((item) => {
        this.applyCodeList.push({ value: item.code })
        this.goodServeList.push({ value: item.code, subText: item.name })
      })
    }
  },
  methods: {
    handleShowSet(value) {
      if (value === 'duan') {
        this.isList = false
      } else if (value === 'lie') {
        this.isList = true
      }
    },
    activeGroup(value) {
      this.activeGroupVal = value
    },
    activeEn(value) {
      this.activeEnVal = value
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
