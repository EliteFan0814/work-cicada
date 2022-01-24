import prompt from '@/components/prompt.vue'
import top from '@/components/topNoLogin.vue'
import menus from '@/components/report/menu.vue'
import titles from '@/components/title.vue'
import mains from '@/components/report/main.vue'
import { api } from '@/assets/js/util.js'
import loading from '@/components/loading.vue'
const API = api()

export default {
  data() {
    return {
      titleName: '客户商标分析报告',
      prompt: '',
      promptType: 'success',
      mainShow: false,
      menuIndex: 0,
      title: '待办事项',
      colorList: [
        '#f95d5b',
        '#6dc7f6',
        '#749F83',
        '#FB717E',
        '#9967BD',
        '#E0D1EB'
      ],
      id: '',
      mainsList: [], // 申请人主体层  申请人
      mainAddrsList: [], // 申请人主体层 地址
      empty: false,
      loading: true,

      // 统计
      brandCount: {},
      // 热力图
      mapData: {
        yAxis: [],
        xAxis: [],
        data: []
      },
      // 品牌
      brandList: [],
      // 类别分布
      catData: [],
      // 柱状图
      lineData: []
    }
  },
  components: {
    top,
    prompt,
    menus,
    titles,
    mains,
    loading
  },
  methods: {
    // 获取主体 && 操作
    getMainFn() {
      API.get(`/report/report/base/${this.id}`, '').then((r) => {
        this.loading = false
        if (r.data.code == 200) {
          if (r.data.apply_info && r.data.apply_info.length) {
            r.data.apply_info.map((i_2, index_2) => {
              if (i_2.addrs) {
                i_2.mainAddrsList = []
                for (const x in i_2.addrs) {
                  i_2.mainAddrsList.push({ id: x, addr: i_2.addrs[x] })
                }
              }
            })
            this.mainsList = r.data.apply_info
            this.mainAddrsList = this.mainsList[0].mainAddrsList
            document.title = `${this.mainsList[0].name}-商标分析报告-细软图思`
          }
          this.getMapFn()
          this.getBrandFn()
          this.getCatsFn()
        }
      })
    },
    mainLayerFn() {
      this.mainShow = true
    },
    // 获取商标统计周期类别申请热力图
    getMapFn() {
      API.get(`/report/report/main/${this.id}`, {}).then((res) => {
        if (res.data.code == 200) {
          this.$set(this.brandCount, 'reg', res.data.reg_count)

          this.$set(this.brandCount, 'apply', res.data.apply_count)
          // this.mapData['yAxis'] = res.data.y
          // this.mapData['xAxis'] = res.data.x
          // this.mapData['data'] = res.data.cat_year
          this.mapData = res.data.year_cat_count
          this.lineData = res.data.lawStatus
          // this.echartsMapFn();
        }
      })
    },
    // 商标品牌TOP10
    getBrandFn() {
      API.get(`/report/report/detail_brand/${this.id}/10`, {}).then((res) => {
        if (res.data.code == 200) {
          this.brandList = res.data.list
        }
      })
    },
    // 分类分布
    getCatsFn(el) {
      let url = `/report/report/main_category/${this.id}/0`
      if (el && el.target.checked) {
        url = `/report/report/main_category/${this.id}/1`
      }
      this.catData = []
      API.get(url, {}).then((res) => {
        if (res.data.code == 200) {
          for (const key of res.data.category) {
            this.catData.push({
              name: key.category,
              value: key.nums,
              mix: key.percent
            })
          }
          this.$set(this.brandCount, 'cat', res.data.cat_count)
          this.echartsCatFn()
        }
      })
    },

    toBrandFn(data) {
      const that = this
      this.$router.push({
        path: '/AnalyseDetail/brand',
        query: {
          id: this.id,
          brand: data.key
        }
      })
    },
    // 周期类别申请热力图
    // echartsMapFn() {
    //   const that = this;
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart = this.$echarts.init(document.getElementById('echart02'));
    //   let data = this.mapData['data'].map(function (item) {
    //     return [item[1], item[0], item[2] || '-'];
    //   });
    //   // 绘制图表
    //   myChart.setOption({
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: function (data) {
    //         return `${that.mapData['yAxis'][data['value'][1]]}年 <br /> ${that.mapData['xAxis'][data['value'][0]]}类：${[data['value'][2]]}`
    //       }
    //     },
    //     animation: false,
    //     xAxis: {
    //       data: that.mapData['xAxis'],
    //       splitArea: {
    //         show: true
    //       }
    //     },
    //     yAxis: {
    //       data: that.mapData['yAxis'],
    //       splitArea: {
    //         show: true
    //       }
    //     },
    //     visualMap: {
    //       min: 0,
    //       max: 10,
    //       inRange: {
    //         color: ['#fff', 'orange', '#f60', 'red'],
    //       },
    //       show: false
    //     },
    //     series: [{
    //       type: 'heatmap',
    //       data: data,
    //       emphasis: {
    //         itemStyle: {
    //           borderColor: '#333',
    //           borderWidth: 1
    //         }
    //       },
    //       progressive: 1000,
    //       animation: false
    //     }]
    //   })
    // },

    // 分类分部
    echartsCatFn() {
      const that = this
      // function getLevelOption() {
      //   return [
      //     { itemStyle: { borderWidth: 3, gapWidth: 1 } },
      //     { itemStyle: { gapWidth: 1 } },
      //     {
      //       colorSaturation: [0.35, 0.5], itemStyle: { gapWidth: 1, borderColorSaturation: 0.6 }
      //     }];
      // }
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('echart01'))
      // 绘制图表
      myChart.setOption({
        color: [
          '#d87c7c',
          '#919e8b',
          '#d7ab82',
          '#6e7074',
          '#61a0a8',
          '#efa18d',
          '#787464',
          '#cc7e63',
          '#724e58',
          '#4b565b'
        ],
        tooltip: {
          type: 'hideTip',
          formatter: function(value) {
            const data = value.data
            return `${data.name}: ${data.value} (${data.mix})`
          }
        },
        animation: true,
        series: [
          {
            type: 'treemap',
            name: '类别分布',
            data: that.catData,
            itemStyle: {
              borderColor: '#000'
            }
            // levels: getLevelOption(),
          }
        ]
      })
    },
    closeFN(i) {
      this.mainShow = i
    },
    addrListFn(list) {
      this.mainAddrsList = list
    },
    classFn(size) {
      switch (true) {
        case size > 0 && size < 5:
          return 'red1'
          break
        case size >= 6 && size < 10:
          return 'red2'
          break
        case size >= 11 && size < 30:
          return 'red3'
          break
        case size >= 31 && size < 50:
          return 'red4'
          break
        case size >= 51 && size < 100:
          return 'red5'
          break
        case size >= 101 && size < 150:
          return 'red6'
          break
        case size >= 151 && size < 200:
          return 'red7'
          break
        case size >= 200:
          return 'red8'
          break
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getMainFn()
  },
  created() {
    this.$route.query.id
      ? (this.id = this.$route.query.id)
      : this.$router.push('/')
  }
}
