<template>
  <div v-loading="loading" class="new-business">
    <h2>{{ companyInfo.name || companyInfo.name_en }}</h2>
    <div class="table-wrap">
      <table>
        <rowSingle name="企业名称">
          <div class="comp">
            <span class="comp-name">
              {{ companyInfo.name || companyInfo.name_en }}
            </span>
            <span class="comp-id">{{ customer_code }}</span>
          </div>
        </rowSingle>
        <rowDouble :name="doubleNameList[0]">
          <template v-slot:value1>
            <div>{{ companyInfo.corporator }}</div>
          </template>
          <template v-slot:value2>
            <div>{{ companyInfo.code }}</div>
          </template>
        </rowDouble>
        <rowDouble :name="doubleNameList[1]">
          <template v-slot:value1>
            <div>{{ companyInfo.reg_cap }}</div>
          </template>
          <template v-slot:value2>
            <div>{{ companyInfo.status }}</div>
          </template>
        </rowDouble>
        <rowDouble :name="doubleNameList[2]">
          <template v-slot:value1>
            <div>{{ companyInfo.genre }}</div>
          </template>
          <template v-slot:value2>
            <div>{{ companyInfo.email }}</div>
          </template>
        </rowDouble>
        <rowSingle name="成立时间">
          <div>{{ companyInfo.start_at | $formatDate }}</div>
        </rowSingle>
        <rowSingle name="英文名">
          <div>{{ companyInfo.name_en }}</div>
        </rowSingle>
        <rowSingle name="电话">
          <div class="phone">
            <div
              v-for="item in companyInfo.phones"
              :key="item"
              class="phone-item"
            >
              <span class="phone-val">{{ item }}</span>
              <span
                class="iconfont icon-copy"
                title="复制"
                @click="handleCopy(item)"
              >
                复制
              </span>
            </div>
          </div>
        </rowSingle>
        <rowSingle name="曾用名">
          <span v-for="item in companyInfo.name_used" :key="item">
            {{ item }}；
          </span>
        </rowSingle>
        <rowSingle name="注册地址">
          <div>{{ companyInfo.address }}</div>
        </rowSingle>
        <rowSingle name="经营范围">
          <div class="bus-scope">
            {{ companyInfo.scope }}
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
      <div class="table-detail">
        <tableDetail
          :tableData="activeTableInfo"
          :genre="activeTableGenre"
          :timestamp="timestamp"
        ></tableDetail>
      </div>
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
      loading: false,
      eid: undefined,
      // 高亮时间戳
      timestamp: undefined,
      doubleNameList: [
        { name1: '法定代表人', name2: '统一社会信用代码' },
        { name1: '注册资本', name2: '登记状态' },
        { name1: '企业类型', name2: '邮箱' }
        // { name1: '组织机构代码', name2: '成立时间' },
      ],
      tabsList: [
        // { label: '异议', value: 0, isActive: true, tips: 0 },
        // { label: '无效', value: 1, isActive: false, tips: 10 },
        // { label: '撤三', value: 2, isActive: false, tips: 20 }
        // { label: '注册驳回', value: 3, isActive: false, tips: 20 },
        // { label: '驳回复审', value: 4, isActive: false, tips: 20 },
        // { label: '初审近似', value: 5, isActive: false, tips: 20 },
        // { label: '续展', value: 6, isActive: false, tips: 20 },
        // { label: '变更', value: 7, isActive: false, tips: 20 }
      ],
      companyInfo: {},
      customer_code: undefined,
      tableInfoList: [],
      activeTableInfo: [],
      activeTableGenre: undefined
    }
  },
  created() {
    this.timestamp = this.$route.query.t || ''
    this.eid = this.$route.query.eid || ''
    this.getBusinessInfo()
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
      // 替换当前正在展示的信息以及该信息的类别
      this.activeTableInfo = this.tableInfoList[index].brands
      this.activeTableGenre = this.tableInfoList[index].genre
      console.log(this.activeTableInfo)
    },
    // 获取页面信息
    getBusinessInfo() {
      if (this.eid) {
        this.loading = true
        search
          .getBusinessInfo(this.eid)
          .then((res) => {
            this.loading = false
            this.companyInfo = res.company || {}
            this.customer_code = res.customer_code || ''
            res.businesses = res.businesses || []
            res.businesses.push({
              count: 2,
              name: '无效',
              genre: 2,
              brands: [
                {
                  reg_id: '8717420',
                  category: 41,
                  status: '已注册',
                  name: '小小乐园',
                  date_app: '2010-10-08T00:00:00+08:00',
                  date_pre: '2013-09-27T00:00:00+08:00',
                  date_reg: '2013-12-28T00:00:00+08:00',
                  date_end: '2023-12-27T00:00:00+08:00',
                  agent_name: '上海东方专利商标代理有限公司',
                  description: '差6个月到续展期',
                  send_timestamp: 0,
                  flows: [
                    { name: '超', process: '大学', flow_at: '2022-05-08' },
                    { name: '校超', process: '大学', flow_at: '2022-05-08' },
                    { name: '45', process: '大学', flow_at: '2022-05-08' },
                    { name: '23', process: '大学', flow_at: '2022-05-08' },
                    { name: 'we', process: '大学', flow_at: '2022-05-08' },
                    { name: 'rt', process: '大学', flow_at: '2022-05-08' },
                    { name: 'yuuuuu', process: '大学', flow_at: '2022-05-08' },
                    { name: '67', process: '大学', flow_at: '2022-05-08' }
                  ]
                },
                {
                  reg_id: '7396054',
                  category: 9,
                  status: '已注册',
                  name: '开心农场',
                  date_app: '2009-05-14T00:00:00+08:00',
                  date_pre: '2013-06-27T00:00:00+08:00',
                  date_reg: '2013-09-28T00:00:00+08:00',
                  date_end: '2023-09-27T00:00:00+08:00',
                  agent_name: '上海东方专利商标代理有限公司',
                  description: '差3个月到续展期',
                  send_timestamp: 0,
                  flows: [
                    { name: 'fan校超', process: '大学', flow_at: '2022-05-08' },
                    { name: 'fan超', process: '大学', flow_at: '2022-05-08' }
                  ]
                }
              ]
            })
            this.tableInfoList = res.businesses
            // 默认展示第一个信息
            this.activeTableInfo = this.tableInfoList[0].brands
            // 传递第一个信息的类别
            this.activeTableGenre = this.tableInfoList[0].genre
            this.tabsList = res.businesses.map((item, index) => {
              const temp = {}
              temp.index = index
              temp.label = item.name
              temp.isActive = index === 0
              temp.tips = item.count
              return temp
            })
            console.log(res)
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.new-business {
  min-height: 700px;
  background: #f7f9fc;
  padding-bottom: 15px;
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
