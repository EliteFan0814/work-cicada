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
          <div v-if="companyInfo.checked_phones" class="phone">
            <div
              v-for="item in companyInfo.checked_phones"
              :key="item.mobile"
              class="phone-item"
            >
              <el-tooltip effect="dark" placement="top-start">
                <template slot="content">
                  <span>
                    {{ item.area }} {{ item.operator }} {{ item.status_text }}
                  </span>
                </template>
                <span>
                  <span
                    class="phone-val"
                    :class="{ 'no-real': item.status != 1 }"
                  >
                    {{ item.mobile }}
                  </span>
                </span>
              </el-tooltip>
              <span
                class="iconfont icon-copy"
                title="复制"
                @click="handleCopy(item.mobile || '')"
              >
                复制
              </span>
            </div>
            <el-button
              v-if="busType === 'other'"
              type="primary"
              size="small"
              @click="handleShowDialogPhone"
            >
              转CRM客户
            </el-button>
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
            <el-badge
              :value="item.tips"
              :hidden="item.tips === 0"
              type="primary"
            >
              <div class="tab-name">{{ item.label }}</div>
            </el-badge>
          </div>
        </div>
        <el-button
          class="export-excel"
          type="primary"
          size="mini"
          @click="outputXlsxFile(exportData)"
        >
          导出到Excel
        </el-button>
        <!-- <export-excel
          class="export-excel"
          type="xls"
          :data="exportExcelData"
          :fields="exportExcelHeaderConfig"
          :name="exportExcelName"
        >
        </export-excel> -->
      </div>
      <div class="table-detail">
        <tableDetail
          :tableData="activeTableInfo"
          :genre="activeTableGenre"
          :timestamp="timestamp"
        ></tableDetail>
      </div>
    </div>
    <dialogSelectPhone
      v-if="showSelectPhone"
      :eid="eid"
      :phoneList="companyInfo.checked_phones"
      @submit="handleCrmPhoneSubmit"
    ></dialogSelectPhone>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import rowSingle from './components/rowSingle.vue'
import rowDouble from './components/rowDouble.vue'
import tableDetail from './components/tableDetail.vue'
import dialogSelectPhone from './components/dialogSelectPhone.vue'

import search from '@/api/search'
export default {
  name: 'TrademarkBusiness',
  components: { rowSingle, rowDouble, tableDetail, dialogSelectPhone },
  data() {
    return {
      // json_fields: {
      //   'Complete name': 'name',
      //   City: 'city',
      //   Telephone: 'phone.mobile',
      //   'Telephone 2': {
      //     field: 'phone.landline',
      //     callback: (value) => {
      //       return `Landline Phone - ${value}`
      //     }
      //   }
      // },
      // json_data: [
      //   {
      //     name: 'Tony Peña',
      //     city: 'New York',
      //     country: 'United States',
      //     birthdate: '1978-03-15',
      //     phone: {
      //       mobile: '1-541-754-3010',
      //       landline: '(541) 754-3010'
      //     }
      //   },
      //   {
      //     name: 'Thessaloniki',
      //     city: 'Athens',
      //     country: 'Greece',
      //     birthdate: '1987-11-23',
      //     phone: {
      //       mobile: '+1 855 275 5071',
      //       landline: '(2741) 2621-244'
      //     }
      //   }
      // ],
      // json_meta: [
      //   [
      //     {
      //       key: 'charset',
      //       value: 'utf-8'
      //     }
      //   ]
      // ],
      exportExcelHeaderConfig: {
        商机: 'description',
        注册号: 'reg_id',
        类别: 'category',
        商标状态: 'status_text',
        商标名称: 'name',
        申请日期: 'date_app',
        初审日期: 'date_pre',
        注册日期: 'date_reg',
        有效期: 'date_end',
        代理机构: 'agent_name'
      },
      exportExcelData: [],
      exportExcelName: undefined,
      loading: false,
      eid: undefined,
      busType: 'mine', // 商机类型
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
      activeTableGenre: undefined,
      showSelectPhone: false,
      exportData: {},
      exportExcelHeaderMap: {
        异议: {
          description: '商机',
          reg_id: '注册号',
          category: '类别',
          status_text: '商标状态',
          name: '商标名称',
          date_app: '申请日期',
          date_pre: '初审日期',
          date_reg: '注册日期',
          date_end: '有效期',
          agent_name: '代理机构'
        },
        无效: {
          description: '商机',
          reg_id: '注册号',
          category: '类别',
          status_text: '商标状态',
          name: '商标名称',
          date_app: '申请日期',
          date_pre: '初审日期',
          date_reg: '注册日期',
          date_end: '有效期',
          agent_name: '代理机构'
        },
        撤三: {
          description: '商机',
          reg_id: '注册号',
          category: '类别',
          status_text: '商标状态',
          name: '商标名称',
          date_app: '申请日期',
          date_pre: '初审日期',
          date_reg: '注册日期',
          date_end: '有效期',
          agent_name: '代理机构'
        },
        注册驳回: {
          description: '商机',
          reg_id: '注册号',
          category: '类别',
          status_text: '商标状态',
          name: '商标名称',
          date_app: '申请日期',
          date_pre: '初审日期',
          date_reg: '注册日期',
          date_end: '有效期',
          agent_name: '代理机构'
        },
        驳回复审: {
          description: '商机',
          reg_id: '注册号',
          category: '类别',
          status_text: '商标状态',
          name: '商标名称',
          date_app: '申请日期',
          date_pre: '初审日期',
          date_reg: '注册日期',
          date_end: '有效期',
          agent_name: '代理机构'
        },
        初审近似: {
          description: '商机',
          reg_id: '注册号',
          category: '类别',
          status_text: '商标状态',
          name: '商标名称',
          date_app: '申请日期',
          date_pre: '初审日期',
          date_reg: '注册日期',
          date_end: '有效期',
          agent_name: '代理机构'
        },
        续展: {
          description: '商机',
          reg_id: '注册号',
          category: '类别',
          status_text: '商标状态',
          name: '商标名称',
          date_app: '申请日期',
          date_pre: '初审日期',
          date_reg: '注册日期',
          date_end: '有效期',
          agent_name: '代理机构'
        },
        变更: {
          description: '商机',
          reg_id: '注册号',
          category: '类别',
          status_text: '商标状态',
          name: '商标名称',
          date_app: '申请日期',
          date_pre: '初审日期',
          date_reg: '注册日期',
          date_end: '有效期',
          agent_name: '代理机构'
        }
      },
      exportDataHeaders: {},
      dataMap: {
        基本信息: { 姓名: 'name', 性别: 'sex', 年龄: 'age' },
        成绩: { 专业: 'class', 教师: 'teacher', 成绩: 'score' }
      },
      data: {
        基本信息: [
          { name: '李四', sex: 'nan', age: 12 },
          { name: '李而四', sex: '女', age: 32 }
        ],
        成绩: [
          { class: '计算机', teacher: 'Mrs wang', score: 90 },
          { class: '计算机', teacher: 'Mrs wang', score: 70 }
        ]
      },
      columnHeaders: {
        基本信息: ['姓名', '性别', '年龄'],
        成绩: ['专业', '教师', '成绩']
      }
    }
  },
  created() {
    this.timestamp = this.$route.query.t || '-1'
    this.eid = this.$route.query.eid || ''
    // 是否是本公司商机
    this.busType = this.$route.query.type || 'main'
    this.getBusinessInfo()
  },
  methods: {
    /**
     * @param {array} exportData 表格数据
     * @param {array} exportDataHeaders 表头信息
     * @param {string} key excel sheet name
     * @param {object} exportExcelHeaderMap 表头和数据的映射
     */
    transferData(exportData, exportDataHeaders, key, exportExcelHeaderMap) {
      const content = []
      // 把第一行的表头传入
      content.push(exportDataHeaders)
      // 遍历原始数据，把转换后的数据导入 content
      exportData.forEach((item, index) => {
        const arr = []
        // 通过遍历表头获取对应的数据
        exportDataHeaders.map((column) => {
          let mapKey = ''
          for (const tempKey in exportExcelHeaderMap[key]) {
            if (exportExcelHeaderMap[key][tempKey] == column) {
              mapKey = tempKey
            }
          }
          arr.push(item[mapKey])
        })
        content.push(arr)
      })
      return content
    },
    // 导出为excel
    outputXlsxFile(data) {
      this.loading = true
      try {
        const sheetNames = []
        const sheetsList = {}
        const wb = XLSX.utils.book_new()
        for (const key in data) {
          sheetNames.push(key)
          const columnHeader = this.exportDataHeaders[key] // 此处是每个sheet的表头
          const temp = this.transferData(
            data[key],
            columnHeader,
            key,
            this.exportExcelHeaderMap
          )
          sheetsList[key] = XLSX.utils.aoa_to_sheet(temp)
          // sheetsList[key]['!cols'] = wscols
        }
        // 每个sheet的名字
        wb.SheetNames = sheetNames
        // 每个sheet的数据
        wb.Sheets = sheetsList
        XLSX.writeFile(wb, this.exportExcelName + '.xlsx')
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },
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
    },
    // 获取页面信息
    getBusinessInfo() {
      if (this.eid) {
        this.loading = true
        search
          .getBusinessInfo(this.eid, this.busType)
          .then((res) => {
            this.loading = false
            this.companyInfo = res.company || {}
            this.customer_code = res.customer_code || ''
            res.businesses = res.businesses || []
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
            // 将table数据综合到一起用于直接导出为excel
            this.exportExcelData = []
            // 导出的文件名
            this.exportExcelName = `${
              this.companyInfo.name || this.companyInfo.name_en || ''
            }_${this.$dayjs().format('YYYY-MM-DD')}`
            // 生成表头映射 生成所需的表数据格式
            this.tableInfoList.map((item) => {
              this.exportData[item.name] = item.brands
              const tempArr = []
              const tempSheetMapObj = this.exportExcelHeaderMap[item.name]
              for (const sheetName in tempSheetMapObj) {
                tempArr.push(tempSheetMapObj[sheetName])
              }
              this.exportDataHeaders[item.name] = tempArr
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    handleShowDialogPhone() {
      this.showSelectPhone = true
    },
    handleCrmPhoneSubmit(flag) {
      this.showSelectPhone = false
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
        flex-wrap: wrap;
        .phone-item {
          padding: 5px 10px;
          .phone-val {
            cursor: pointer;
            padding-right: 5px;
          }
          .no-real {
            text-decoration: line-through;
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
        width: 10%;
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
      .export-excel {
        margin-left: 5px;
      }
    }
    .table-detail {
      padding: 10px;
      background-color: #fff;
    }
  }
}
</style>
