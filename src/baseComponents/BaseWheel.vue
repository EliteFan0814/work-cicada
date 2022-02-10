<template>
  <div class="base-wheel" id="echart-wheel">

  </div>
</template>

<script>
export default {
  name: 'BaseWheel',
  data() {
    return {
      chartDom: null,
      myChart: null,
      option: null,
      activeColor: '#bcf2fb',
      unActiveColor: '#58c4ff'
    }
  },
  mounted() {
    this.iniEchartsInstance()
  },
  destroyed() {},
  methods: {
    iniEchartsInstance() {
      this.chartDom = document.getElementById('echart-wheel')
      this.myChart = this.$echarts.init(this.chartDom)
      const unActiveColor = '#cdedff'
      const activeColor = '#58c4ff'
      var data = [
        {
          name: '1-化学原料',
          value: 10,
          itemStyle: { color: unActiveColor }
        },
        { name: '2-颜料油漆', value: 10, itemStyle: { color: unActiveColor } },
        { name: '3-日化用品', value: 10, itemStyle: { color: activeColor } },
        // {
        //   name: '3-日化用品',
        //   value: 10,
        //   itemStyle: {
        //     color: 'rgba(0, 0, 0 ,0)',
        //     borderColor: 'rgba(0, 0, 0 ,0)'
        //   }
        // },
        { name: '4-燃料油脂', value: 10, itemStyle: { color: unActiveColor } },
        { name: '5-医药', value: 10, itemStyle: { color: unActiveColor } },
        { name: '6-金属材料', value: 10, itemStyle: { color: unActiveColor } },
        { name: '7-机械设备', value: 10, itemStyle: { color: unActiveColor } },
        { name: '8-手工器械', value: 10, itemStyle: { color: unActiveColor } },
        { name: '9-科学仪器', value: 10, itemStyle: { color: unActiveColor } },
        { name: '10-医疗器械', value: 10, itemStyle: { color: unActiveColor } },
        { name: '11-灯具空调', value: 10, itemStyle: { color: unActiveColor } },
        { name: '12-运输工具', value: 10, itemStyle: { color: unActiveColor } },
        { name: '13-军火烟火', value: 10, itemStyle: { color: unActiveColor } },
        { name: '14-珠宝钟表', value: 10, itemStyle: { color: unActiveColor } },
        { name: '15-乐器', value: 10, itemStyle: { color: unActiveColor } },
        { name: '16-办公用品', value: 10, itemStyle: { color: unActiveColor } },
        { name: '17-橡胶制品', value: 10, itemStyle: { color: unActiveColor } },
        { name: '18-皮革皮具', value: 10, itemStyle: { color: unActiveColor } },
        { name: '19-建筑材料', value: 10, itemStyle: { color: unActiveColor } },
        { name: '20-家具', value: 10, itemStyle: { color: unActiveColor } },
        { name: '21-厨房洁具', value: 10, itemStyle: { color: unActiveColor } },
        { name: '22-绳网袋篷', value: 10, itemStyle: { color: unActiveColor } },
        { name: '23-纱线丝', value: 10, itemStyle: { color: unActiveColor } },
        { name: '24-布料床单', value: 10, itemStyle: { color: unActiveColor } },
        { name: '25-服装鞋帽', value: 10, itemStyle: { color: unActiveColor } },
        { name: '26-钮扣拉链', value: 10, itemStyle: { color: unActiveColor } },
        { name: '27-地毯席垫', value: 10, itemStyle: { color: unActiveColor } },
        { name: '28-健身器材', value: 10, itemStyle: { color: unActiveColor } },
        { name: '29-食品', value: 10, itemStyle: { color: unActiveColor } },
        { name: '30-方便食品', value: 10, itemStyle: { color: unActiveColor } },
        { name: '31-饲料种籽', value: 10, itemStyle: { color: unActiveColor } },
        { name: '32-啤酒饮料', value: 10, itemStyle: { color: unActiveColor } },
        { name: '33-酒', value: 10, itemStyle: { color: unActiveColor } },
        { name: '34-烟草烟具', value: 10, itemStyle: { color: unActiveColor } },
        { name: '35-广告销售', value: 10, itemStyle: { color: unActiveColor } },
        { name: '36-金融物管', value: 10, itemStyle: { color: unActiveColor } },
        { name: '37-建筑修理', value: 10, itemStyle: { color: unActiveColor } },

        { name: '38-通讯服务', value: 10, itemStyle: { color: unActiveColor } },
        { name: '39-运输贮藏', value: 10, itemStyle: { color: unActiveColor } },

        { name: '40-教育娱乐', value: 10, itemStyle: { color: unActiveColor } },
        { name: '41-教育娱乐', value: 10, itemStyle: { color: unActiveColor } },
        { name: '42-网站服务', value: 10, itemStyle: { color: unActiveColor } },
        { name: '43-餐饮住宿', value: 10, itemStyle: { color: unActiveColor } },
        { name: '44-医疗园艺', value: 10, itemStyle: { color: unActiveColor } },
        { name: '45-社会服务', value: 10, itemStyle: { color: unActiveColor } }
      ]
      this.option = {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        // title: {
        //   top: 20,
        //   text: 'title',
        //   textStyle: {
        //     fontSize: 20,
        //     color: '#DDEEFF'
        //   }
        // },
        grid: {
          top: '50%',
          left: 0,
          right: '1%',
          bottom: 5,
          containLabel: true
        },
        series: [
          {
            name: '2',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['45%', '55%'],
            selectedMode: 'single',
            color: 'rgba(255, 255, 255, 1)',
            data: data,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        ]
      }

      this.myChart.setOption(this.option)
    },
    destoryEcharts() {
      this.myChart.dispose()
    }
  }
}
</script>

<style lang="scss" scoped>
.base-wheel {
  border: 1px solid red;
  width: 100%;
  height: 500px;
}
</style>
