<template>
  <div class="base-wheel-wrap">
    <div class="base-wheel" id="echart-wheel">
    </div>
    <div class="title omit-1">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
  </div>
</template>

<script>
export default {
  name: 'BaseWheel2',
  data() {
    return {
      chartDom: null,
      myChart: null,
      option: null
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
          name: '01',
          classValue: 1,
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '化学原料',
              value: 1,
              classValue: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '02',
          itemStyle: {
            color: activeColor
          },
          children: [
            {
              name: '颜料油漆',
              value: 1,
              itemStyle: {
                color: activeColor
              }
            }
          ]
        },
        {
          name: '03',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '日化用品',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '04',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '燃料油脂',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '05',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '医药',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '06',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '金属材料',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '07',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '机械设备',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '08',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '手工器械',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '09',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '科学仪器',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '10',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '医疗器械',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '11',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '灯具空调',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '12',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '运输工具',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '13',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '军火烟火',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '14',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '珠宝钟表',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '15',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '乐器',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '16',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '办公用品',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '17',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '橡胶制品',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '18',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '皮革皮具',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '19',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '建筑材料',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '20',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '家具',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '21',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '厨房洁具',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '22',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '绳网袋篷',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '23',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '纱线丝',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '24',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '布料床单',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '25',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '服装鞋帽',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '26',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '钮扣拉链',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '27',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '地毯席垫',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '28',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '健身器材',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '29',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '食品',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '30',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '方便食品',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '31',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '饲料种籽',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '32',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '啤酒饮料',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '33',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '酒',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '34',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '烟草烟具',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '35',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '广告销售',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '36',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '金融物管',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '37',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '建筑修理',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '38',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '通讯服务',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '39',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '运输贮藏',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '40',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '教育娱乐',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '41',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '教育娱乐',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '42',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '网站服务',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '43',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '餐饮住宿',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '44',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '医疗园艺',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        },
        {
          name: '45',
          itemStyle: {
            color: unActiveColor
          },
          children: [
            {
              name: '社会服务',
              value: 1,
              itemStyle: {
                color: unActiveColor
              }
            }
          ]
        }
      ]
      this.option = {
        series: {
          type: 'sunburst',
          data: data,
          nodeClick: false,
          radius: ['55%', '95%'],
          sort: undefined,
          emphasis: {
            focus: 'descendant',
            itemStyle: {
              // 高亮时点的颜色。
              color: activeColor
            }
          },
          levels: [
            {},
            {
              r0: '55%',
              r: '70%',
              itemStyle: {
                borderWidth: 2
              },
              label: {
                rotate: 'tangential',
                silent: true
              }
            },
            {
              r0: '70%',
              r: '72%',
              label: {
                position: 'outside',
                padding: 3,
                silent: false
              },
              itemStyle: {
                borderWidth: 3
              }
            }
          ]
        }
      }
      this.myChart.setOption(this.option)
      this.myChart.on('click', function(params) {
        // 控制台打印数据的名称
        console.log(params)
      })
    },
    destoryEcharts() {
      this.myChart.dispose()
    }
  }
}
</script>

<style lang="scss" scoped>
.base-wheel-wrap {
  position: relative;
  .base-wheel {
    width: 100%;
    height: 500px;
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: bold;
    width: 200px;
    text-align: center;
  }
}
</style>
