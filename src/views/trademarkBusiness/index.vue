<template>
  <div class="new-business">
    <h2>吉林省中吉食品集团有限公司</h2>
    <div class="table-wrap">
      <table>
        <rowSingle name="企业名称">
          <div class="comp">
            <span class="comp-name">吉林省中吉食品集团有限公司</span>
            <span class="comp-id">C1206210055</span>
          </div>
        </rowSingle>
        <rowDouble :name="doubleNameList[0]">
          <template v-slot:value1>
            <div>程一鸣</div>
          </template>
          <template v-slot:value2>
            <div>91220106066401624Q</div>
          </template>
        </rowDouble>
        <rowDouble :name="doubleNameList[1]">
          <template v-slot:value1>
            <div>dfdfdf</div>
          </template>
          <template v-slot:value2>
            <div>444</div>
          </template>
        </rowDouble>
        <rowDouble :name="doubleNameList[2]">
          <template v-slot:value1>
            <div>dfdfdf</div>
          </template>
          <template v-slot:value2>
            <div>444</div>
          </template>
        </rowDouble>
        <rowDouble :name="doubleNameList[3]">
          <template v-slot:value1>
            <div>dfdfdf</div>
          </template>
          <template v-slot:value2>
            <div>444</div>
          </template>
        </rowDouble>
        <rowSingle name="英文名">
          <div>hahaahah</div>
        </rowSingle>
        <rowSingle name="电话">
          <div class="phone">
            <div class="phone-item">
              <span class="phone-val">15284574441</span>
              <span
                class="iconfont icon-copy"
                title="复制"
                @click="handleCopy('15284574441')"
              >
                复制
              </span>
            </div>
            <div class="phone-item">
              <span class="phone-val">15284574441</span>
              <span
                class="iconfont icon-copy"
                title="复制"
                @click="handleCopy('15284574441')"
              >
                复制
              </span>
            </div>
            <div class="phone-item">
              <span class="phone-val">15284574441</span>
              <span
                class="iconfont icon-copy"
                title="复制"
                @click="handleCopy('15284574441')"
              >
                复制
              </span>
            </div>
          </div>
        </rowSingle>
        <rowSingle name="曾用名">
          <div>吉林省中吉食品有限公司；吉林省中吉食品有限公司；</div>
        </rowSingle>
        <rowSingle name="注册地址">
          <div>长春市绿园区普阳街2522至通尚都B座558室</div>
        </rowSingle>
        <rowSingle name="经营范围">
          <div class="bus-scope">
            预包装食品批发零售（粮食加工品、食用油、油脂及其制品、调味品、饮料、速冻食品、方便面、蔬菜制品、水果制品、炒货食品及坚果制品、茶叶及相关制品，可可及焙烤咖啡产品，蛋制品、乳制品、糖果制品、饼干、罐头、肉制品），互联网信息服务，计算机领域内的技术研发、技术转让、技术咨询及技术服务，网络工程，计算机软件研发,食用菌、水产品、畜禽、酒水、保健食品、食品添加剂、农副产品、土特产品批发、零售，网上贸易代理，农业机械设备技术服务，食品生产、加工（以上生产、加工项须另设生产经营场所从事经营活动）（依法须经批准的项目，经相关部门批准后方可开展经营活动）**
          </div>
        </rowSingle>
      </table>
    </div>
    <div class="table1-wrap">
      <div class="tabs-wrap">
        <div
          v-for="(item, index) in tabsList"
          :key="item.label"
          :class="{ tab: true, active: item.isActive }"
          @click="handletab(index)"
        >
          <div class="tab-item">
            <el-badge :value="item.tips" :hidden="item.tips === 0">
              <div class="tab-name">{{ item.label }}</div>
            </el-badge>
          </div>
        </div>
      </div>
      <div class="table-detail"><tableDetail></tableDetail></div>
    </div>
  </div>
</template>

<script>
import rowSingle from './components/rowSingle.vue'
import rowDouble from './components/rowDouble.vue'
import tableDetail from './components/tableDetail.vue'

import search from '@/api/search'
export default {
  name: 'TrademarkBusiness',
  components: { rowSingle, rowDouble, tableDetail },
  data() {
    return {
      eid: undefined,
      doubleNameList: [
        { name1: '法定代表人', name2: '统一社会信用代码' },
        { name1: '注册资本', name2: '登记状态' },
        { name1: '组织机构代码', name2: '成立时间' },
        { name1: '企业类型', name2: '邮箱' }
      ],
      tabsList: [
        { label: '异议', value: 0, isActive: true, tips: 0 },
        { label: '无效', value: 1, isActive: false, tips: 10 },
        { label: '撤三', value: 2, isActive: false, tips: 20 },
        { label: '注册驳回', value: 3, isActive: false, tips: 20 },
        { label: '驳回复审', value: 4, isActive: false, tips: 20 },
        { label: '初审近似', value: 5, isActive: false, tips: 20 },
        { label: '续展', value: 6, isActive: false, tips: 20 },
        { label: '变更', value: 7, isActive: false, tips: 20 }
      ]
    }
  },
  created() {
    this.eid = this.$route.query.eid || ''
  },
  methods: {
    // 复制
    handleCopy(copyValue) {
      this.$copyText(copyValue)
        .then((e) => {
          this.$message({ type: 'success', message: '复制成功！' })
        })
        .catch((e) => {
          this.$message({ type: 'error', message: '复制失败！' })
        })
    },
    // 处理切换
    handletab(index) {
      this.tabsList.map((item) => {
        item.isActive = false
      })
      this.tabsList[index].isActive = true
    }
  }
}
</script>

<style lang="scss" scoped>
.new-business {
  min-height: 700px;
  background: #f7f9fc;
  h2 {
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 0px;
    color: #2b2d32;
    padding: 40px 0;
    text-align: center;
  }
  .table-wrap {
    margin: 10px 10px 0;
    padding: 10px;
    background: #fff;
    table {
      width: 100%;
      border-collapse: collapse;
      .comp {
        font-weight: bold;
        .comp-name {
          padding-right: 20px;
        }
        .comp-id {
          color: #ff7620;
        }
      }
      .phone {
        display: flex;
        align-items: center;
        .phone-item {
          padding-right: 25px;
          .phone-val {
            padding-right: 5px;
          }
          .icon-copy {
            font-size: 13px;
            color: #368cf0;
            cursor: pointer;
          }
        }
      }
      .bus-scope {
        line-height: 1.3;
      }
    }
  }
  .table1-wrap {
    margin: 30px 10px 0;
    // padding: 10px;
    background: #fff;
    .tabs-wrap {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 2px solid #368cf0;
      .tab {
        cursor: pointer;
        background-color: #fcfcfc;
        width: 12.5%;
        border: 1px solid #ededed;
        padding: 15px 0 10px;
        transition: all 0.3s;
        .tab-item {
          display: flex;
          justify-content: center;
          .tab-name {
            color: #2b2d32;
            padding: 5px;
          }
        }
      }
      .active {
        border: 1px solid #368cf0;
        background-color: #368cf0;
        .tab-item {
          .tab-name {
            color: #ffffff;
          }
        }
      }
    }
    .table-detail {
      padding: 10px;
      background-color: #fff;
    }
  }
}
</style>
