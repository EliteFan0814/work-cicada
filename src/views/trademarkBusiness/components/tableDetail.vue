<template>
  <div class="table-detail-wrap">
    <el-table
      ref="detail-table"
      border
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :expand-row-keys="expands"
      :highlight-current-row="true"
      :header-cell-style="headerCellStyle"
    >
      <!-- 隐藏展开列，自己实现点击展开 -->
      <el-table-column width="1" type="expand">
        <template slot-scope="props">
          <div class="bus-expand">
            <div class="expand-wrap">
              <div class="expand-head">
                <div class="head-item header1">流程</div>
                <div class="head-item header3">业务名称</div>
                <div class="head-item header3">环节</div>
                <div class="head-item header3">日期</div>
              </div>
              <div class="expand-body">
                <div class="body-item">
                  <div class="progress header1">
                    <i class="iconfont icon-radiobuttonselect"></i>
                    <div class="line"></div>
                  </div>
                  <div class="bus-name header3"><span>商标注册申请</span></div>
                  <div class="bus-step header3"><span>驳回通知发文</span></div>
                  <div class="bus-date header3"><span>2015年5月2日</span></div>
                </div>
                <div class="body-item">
                  <div class="progress header1">
                    <i class="iconfont icon-radiobuttonselect"></i>
                    <div class="line"></div>
                  </div>
                  <div class="bus-name header3"><span>商标注册申请</span></div>
                  <div class="bus-step header3"><span>驳回通知发文</span></div>
                  <div class="bus-date header3"><span>2015年5月2日</span></div>
                </div>
              </div>
              <div class="body-more">
                <span>更多</span>
                <i class="iconfont icon-arrow-down"></i>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="序号" prop="id" align="center"></el-table-column>
      <el-table-column label="商机" prop="name" align="center">
        <template slot-scope="scope">
          <div class="bus-wrap">
            <div>驳回复审商机</div>
            <div class="bus-detail" @click="expandRow(scope.row)">
              <span>详情</span>
              <i class="iconfont icon-arrow-down"></i>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="注册号"
        prop="desc"
        align="center"
      ></el-table-column>
      <el-table-column
        label="类别"
        prop="desc"
        align="center"
      ></el-table-column>
      <el-table-column label="商标状态" prop="desc" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag effect="dark" type="warning" size="small">待审中</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商标名称" prop="desc" align="center">
        <template slot-scope="scope">
          <div>
            <div>五月花</div>
            <div>WUYUEHUA</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="desc" align="center">
        <template slot-scope="scope">
          <div>
            <div>
              <span>申请日期：</span>
              <span>2021-05-08</span>
            </div>
            <div>
              <span>初审日期：</span>
              <span>2021-05-08</span>
            </div>
            <div>
              <span>注册日期：</span>
              <span>2021-05-08</span>
            </div>
            <div>
              <span>有 效 期：</span>
              <span>2021-05-08</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="代理机构"
        prop="desc"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }
      ],
      expands: [],
      headerCellStyle: {
        backgroundColor: '#f3f9fc',
        textAlign: 'center',
        color: '#2b2d32'
      }
    }
  },
  methods: {
    expandRow(row) {
      // this.$refs['detail-table'].toggleRowExpansion(row)
      if (this.expands.indexOf(row.id) < 0) {
        this.expands = []
        this.expands.push(row.id)
      } else {
        this.expands = []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.table-detail-wrap {
  ::v-deep .el-table__expand-icon {
    display: none;
    // visibility: hidden;
  }
  ::v-deep .el-table__expanded-cell {
    padding: 0px;
  }
  .bus-expand {
    padding: 15px 20px;
    background-color: #fafafa;
    .expand-wrap {
      .expand-head {
        padding: 10px 20px;
        width: 100%;
        background-color: #f3f9fc;
        border: 1px solid #e5eef6;
        border-bottom: none;
        display: flex;
        .head-item {
          padding: 5px 0;
          text-align: center;
        }
        .header1 {
          width: 10%;
        }
        .header3 {
          width: 30%;
        }
      }
      .expand-body {
        padding: 10px 20px;
        background-color: #fff;
        border: 1px solid #e5eef6;
        overflow: hidden;
        .body-item {
          padding-bottom: 5px;
          background-color: #fff;
          display: flex;
          align-items: center;
          .progress {
            position: relative;
            .icon-radiobuttonselect {
              font-size: 20px;
              color: #3285ff;
            }
            .line {
              box-sizing: border-box;
              position: absolute;
              top: 32px;
              left: 50%;
              transform: translateX(-50%);
              height: 38px;
              width: 0px;
              border-left: 3px dashed #e5eef6;
            }
          }
          .bus-name {
            background-color: #f3f9fc;
            position: relative;
            ::before {
              position: absolute;
              top: 50%;
              left: -10px;
              transform: translateY(-50%);
              display: block;
              content: '';
              border: 5px solid;
              border-color: transparent #f3f9fc transparent transparent;
            }
          }
          .header1 {
            text-align: center;
            padding: 15px 0;
            width: 10%;
          }
          .header3 {
            padding: 15px 0;
            background-color: #f3f9fc;
            text-align: center;
            width: 30%;
          }
        }
      }
      .body-more {
        background-image: url(../../../assets/img/trapezoid.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 93px;
        height: 28px;
        margin: -1px auto 0;
        color: #3285ff;
        cursor: pointer;
        // border-radius: 5px;
        // transform: perspective(0.5em) rotateX(5deg);
        // transform-origin: bottom;
        // border: 1px solid red;
      }
    }
  }
  .bus-wrap {
    .bus-detail {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 1;
      color: #368cf0;
    }
  }
}
</style>
