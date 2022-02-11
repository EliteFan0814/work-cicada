<template>
  <div class="base-wheel-wrap">
    <div class="base-wheel" id="echart-wheel">
    </div>
    <div class="title omit-1">{{keyword}}</div>
  </div>
</template>

<script>
export default {
  name: 'BaseWheel2',
  props: {
    keyword: {
      type: String,
      default: ''
    },
    selectedId: {
      type: Array
    }
  },
  data() {
    return {
      chartDom: null,
      myChart: null,
      activeColor: '#58c4ff',
      unAtiveColor: '#cdedff',
      localData: [
        {
          name: '01',
          classValue: 1,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '化学原料',
              value: 1,
              classValue: 1,
              isSelected: false,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '02',
          classValue: 2,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '颜料油漆',
              classValue: 2,
              isSelected: false,

              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '03',
          classValue: 3,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '日化用品',
              classValue: 3,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '04',
          classValue: 4,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '燃料油脂',
              classValue: 4,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '05',
          classValue: 5,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '医药',
              classValue: 5,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '06',
          classValue: 6,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '金属材料',
              classValue: 6,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '07',
          classValue: 7,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '机械设备',
              classValue: 7,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '08',
          classValue: 8,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '手工器械',
              classValue: 8,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '09',
          classValue: 9,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '科学仪器',
              classValue: 9,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '10',
          classValue: 10,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '医疗器械',
              classValue: 10,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '11',
          classValue: 11,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '灯具空调',
              classValue: 11,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '12',
          classValue: 12,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '运输工具',
              classValue: 12,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '13',
          classValue: 13,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '军火烟火',
              classValue: 13,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '14',
          classValue: 14,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '珠宝钟表',
              classValue: 14,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '15',
          classValue: 15,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '乐器',
              classValue: 15,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '16',
          classValue: 16,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '办公用品',
              classValue: 16,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '17',
          classValue: 17,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '橡胶制品',
              classValue: 17,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '18',
          classValue: 18,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '皮革皮具',
              classValue: 18,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '19',
          classValue: 19,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '建筑材料',
              classValue: 19,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '20',
          classValue: 20,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '家具',
              classValue: 20,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '21',
          classValue: 21,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '厨房洁具',
              classValue: 21,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '22',
          classValue: 22,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '绳网袋篷',
              classValue: 22,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '23',
          classValue: 23,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '纱线丝',
              classValue: 23,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '24',
          classValue: 24,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '布料床单',
              classValue: 24,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '25',
          classValue: 25,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '服装鞋帽',
              classValue: 25,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '26',
          classValue: 26,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '钮扣拉链',
              classValue: 26,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '27',
          classValue: 27,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '地毯席垫',
              classValue: 27,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '28',
          classValue: 28,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '健身器材',
              classValue: 28,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '29',
          classValue: 29,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '食品',
              classValue: 29,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '30',
          classValue: 30,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '方便食品',
              classValue: 30,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '31',
          classValue: 31,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '饲料种籽',
              classValue: 31,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '32',
          classValue: 32,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '啤酒饮料',
              classValue: 32,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '33',
          classValue: 33,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '酒',
              classValue: 33,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '34',
          classValue: 34,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '烟草烟具',
              classValue: 34,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '35',
          classValue: 35,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '广告销售',
              classValue: 35,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '36',
          classValue: 36,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '金融物管',
              classValue: 36,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '37',
          classValue: 37,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '建筑修理',
              classValue: 37,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '38',
          classValue: 38,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '通讯服务',
              classValue: 38,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '39',
          classValue: 39,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '运输贮藏',
              classValue: 39,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '40',
          classValue: 40,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '教育娱乐',
              classValue: 40,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '41',
          classValue: 41,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '教育娱乐',
              classValue: 41,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '42',
          classValue: 42,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '网站服务',
              classValue: 42,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '43',
          classValue: 43,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '餐饮住宿',
              classValue: 43,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '44',
          classValue: 44,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '医疗园艺',
              classValue: 44,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        },
        {
          name: '45',
          classValue: 45,
          isSelected: false,
          itemStyle: {
            color: '#cdedff'
          },
          label: {
            color: '#fff'
          },
          children: [
            {
              name: '社会服务',
              classValue: 45,
              isSelected: false,
              value: 1,
              itemStyle: {
                color: '#cdedff'
              },
              label: {
                fontWeight: 'normal',
                color: '#62c8ff'
              }
            }
          ]
        }
      ]
    }
  },
  watch: {
    selectedId: {
      handler(newVal) {
        this.localData.map((item) => {
          if (newVal.includes(item.classValue)) {
            item.isSelected = true
            item.itemStyle.color = this.activeColor
            item.children[0].isSelected = true
            item.children[0].itemStyle.color = this.activeColor
            item.children[0].label.fontWeight = 'bold'
          } else {
            item.isSelected = false
            item.itemStyle.color = this.unAtiveColor
            item.children[0].isSelected = false
            item.children[0].itemStyle.color = this.unAtiveColor
            item.children[0].label.fontWeight = 'normal'
          }
        })
        this.destoryEcharts()
        this.iniEchartsInstance()
      },
      deep: true
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
      const localOption = {
        series: {
          type: 'sunburst',
          data: this.localData,
          nodeClick: false,
          radius: ['55%', '95%'],
          sort: undefined,
          emphasis: {
            focus: 'series',
            itemStyle: {
              // 高亮时点的颜色。
              color: '#58c4ff'
            },
            label: {
              // color: '#fff',
              fontWeight: 'bold'
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
      this.myChart.setOption(localOption)
      // 触发点击事件
      this.myChart.on('click', (params) => {
        // 控制台打印数据的名称
        // 必须是已包含的类别才能够点击
        if (params.data.isSelected) {
          const index = params.data.classValue - 1
          // 是否有孩子
          // const hasChild = !!params.data.children
          // const tempColor = this.localData[index].itemStyle.color
          // if (tempColor === '#58c4ff') {
          //   // 如果是 高亮 变为非高亮
          //   this.localData[index].itemStyle.color = '#cdedff'
          //   if (hasChild) {
          //     this.localData[index].children[0].itemStyle.color = '#cdedff'
          //     this.localData[index].children[0].label.fontWeight = 'normal'
          //   }
          // } else {
          //   this.localData[index].itemStyle.color = '#58c4ff'
          //   if (hasChild) {
          //     this.localData[index].children[0].itemStyle.color = '#58c4ff'
          //     this.localData[index].children[0].label.fontWeight = 'bold'
          //   }
          // }
          this.$emit('changeWheel', params.data.classValue)
          this.myChart.setOption(localOption)
        }
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
