<template>
  <article class="owner-page">
    <aside class="left-nav">
      <h3 class="h3">申请人</h3>
      <div btn class="search-nav" :class="{cur: navCur == index}" v-for="(item, index) in nameList" :key="index"
        @click="navChangeFn(index)"><em class="icon icon-zhixiang-zhishiqiyou"></em>{{item}}</div>
    </aside>
    <section class="main-show">
      <div v-show="loading">
        <loading></loading>
      </div>
      <template v-if="!loading && !contentError">
        <h3 class="holder-name"><em class="icon icon-renyuanmingpian"></em>{{tableData.name}}</h3>
        <div class="owner-touch">
          <header class="header-tag">
            <span class="tag"
              :class="tableData.status_new[tableData.status_new.length-1].color">{{tableData.status_new[tableData.status_new.length-1].status}}</span>
            <span btn class="tag red" @click.stop="fixedShowFn($event, 'name')"
              v-if="tableData.nameUsed && tableData.nameUsed.length">曾用名 <em class="icon icon-bottom"></em></span>
          </header>
          <div class="info-box"><em class="icon icon-fuhao-dianhua"></em>{{tableData.phone}} <span
              v-show="contact['phone'] && contact['phone'].length > 1" class="get-more"
              @click.stop="fixedShowFn($event, 'phone')">更多电话<em class="icon icon-bottom"></em></span></div>
          <div class="info-box"><em class="icon icon-youxiang"></em>{{tableData.email}} <span class="get-more"
              v-show="contact['email'] && contact['email'].length > 1"
              @click.stop="fixedShowFn($event, 'email')">更多邮箱<em class="icon icon-bottom"></em></span></div>
          <div class="info-box long"><em class="icon icon-weizhi"></em>{{tableData.address}} </div>
        </div>
        <div class="owner-info">
          <template>
            <header class="tab-header">
              <div btn @click="tabShowFn(1)" :class="{cur: tabShow == 1}" class="tab-btn">工商信息</div>
              <div btn @click="tabShowFn(2)" :class="{cur: tabShow == 2}" class="tab-btn">股东信息</div>
              <div btn @click="tabShowFn(3)" :class="{cur: tabShow == 3}" class="tab-btn">主要人员</div>
              <div btn @click="tabShowFn(4)" :class="{cur: tabShow == 4}" class="tab-btn">分支机构</div>
              <div btn @click="tabShowFn(5)" :class="{cur: tabShow == 5}" class="tab-btn">变更记录</div>
            </header>
            <div class="tab-show tab-one" v-show="tabShow == 1">
              <table>
                <tbody>
                  <tr>
                    <th>法人代表人</th>
                    <td>{{tableData.person.name}}</td>
                    <th>企业英文名</th>
                    <td>{{tableData.nameEng}}</td>
                  </tr>
                  <tr>
                    <th>经营状态</th>
                    <td>{{tableData.status[0]}}</td>
                    <th>企业类型</th>
                    <td>{{tableData.kind}}</td>
                  </tr>
                  <tr>
                    <th>统一社会信用代码</th>
                    <td>{{tableData.code}}</td>
                    <th>所属行业</th>
                    <td>{{tableData.industry[0]}}</td>
                  </tr>
                  <tr>
                    <th>纳税人识别号</th>
                    <td>{{tableData.code}}</td>
                    <th>注册资本</th>
                    <td>{{tableData.capReg}}</td>
                  </tr>
                  <tr>
                    <th>组织机构代码</th>
                    <td>{{tableData.codeOrg}}</td>
                    <th>实缴资本</th>
                    <td>{{tableData.capPaid}}</td>
                  </tr>
                  <tr>
                    <th>工商注册号</th>
                    <td>{{tableData.no}}</td>
                    <th>成立日期</th>
                    <td>{{tableData.startAt}}</td>
                  </tr>
                  <tr>
                    <th>登记机关</th>
                    <td>{{tableData.org}}</td>
                    <th>核准日期</th>
                    <td>{{tableData.checkAt}}</td>
                  </tr>
                  <tr>
                    <th>所属地区</th>
                    <td>{{tableData.zone}}</td>
                    <th>经营期限</th>
                    <td>{{tableData.termEndAt}}</td>
                  </tr>
                  <tr>
                    <th>经营范围</th>
                    <td colspan="3">
                      <p class="lone">{{tableData.scope}}</p>
                    </td>
                  </tr>
                  <tr>
                    <th>公司简介</th>
                    <td colspan="3">
                      <p class="lone">{{tableData.remark}}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="tab-show" v-show="tabShow == 2">
              <ul class="tab-list-box">
                <li class="li" v-for="(item,index) of tableData.partner" :key="index">{{item.name}}</li>
              </ul>
            </div>
            <div class="tab-show" v-show="tabShow == 3">
              <ul class="tab-list-box">
                <li class="li" v-for="(item,index) of tableData.employee" :key="index">{{item.name}}</li>
              </ul>
            </div>
            <div class="tab-show" v-show="tabShow == 4">
              <ul class="tab-list-box">
                <li class="li" v-for="(item,index) of tableData.branch" :key="index">{{item.name}}</li>
              </ul>
            </div>
            <div class="tab-show tab-last" v-show="tabShow == 5">
              <dl class="common-search-error" v-if="changeList.length == 0">
                <dt class="icon icon-empty1"></dt>
                <dd class="search-txt">无变更信息</dd>
              </dl>
              <template v-if="changeList.length > 0">
                <table>
                  <tr>
                    <th>变更时间</th>
                    <th>变更项目</th>
                    <th>变更前</th>
                    <th>变更后</th>
                  </tr>
                  <tr v-for="(item,index) of changeList" :key="index">
                    <td width="120">{{item.ChangeDate}}</td>
                    <td width="120">{{item.ProjectName}}</td>
                    <td>
                      <div class="style_box" v-for="(i,ind) of item.BeforeList" :key="ind" v-html="i"></div>
                    </td>
                    <td>
                      <div class="style_box" v-for="(i,ind) of item.AfterList" :key="ind" v-html="i"></div>
                    </td>
                  </tr>
                </table>
              </template>
            </div>
          </template>
        </div>
      </template>
      <dl class="common-search-error" v-show="contentError && !loading">
        <dt class="icon icon-empty1"></dt>
        <dd class="search-txt">暂时无法找到申请人工商信息</dd>
      </dl>
    </section>

    <fixed-slot-action ref="slotAction">
      <div class="info-list">
        <p class="p" v-for="(item, index) in slotList" :key="index">{{item}}</p>
      </div>
    </fixed-slot-action>

  </article>
</template>

<script src="./index.js" ></script>

<style lang="scss" scoped >
@import '@/assets/sass/base.scss';

.owner-page {
  @include flex(both, top);
  padding-top: 20px;
  .main-show {
    width: calc(100% - 210px);
  }
}

.left-nav {
  box-sizing: border-box;
  overflow-y: auto;
  width: 190px;
  height: calc(100vh - 260px);
  border-right: 1px solid $border;
  .h3 {
    font-weight: bold;
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 10px;
  }
  .search-nav {
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    line-height: 18px;
    font-size: 12px;
    padding: 6px 10px;
    border-bottom: 1px solid $border;
    .icon {
      display: none;
      position: absolute;
      left: 6px;
      top: 6px;
    }
    &.cur {
      font-weight: bold;
      padding-left: 20px;
      color: $red2;
      .icon {
        display: inline-block;
      }
    }
    &:hover {
      background-color: $bg;
    }
  }
}

.holder-name {
  font-weight: bold;
  font-size: 14px;
  line-height: 30px;
  height: 30px;
  margin-bottom: 10px;
  color: #333;
  .icon {
    margin-right: 6px;
    font-size: 18px;
    line-height: 30px;
    color: $red2;
  }
}

.owner-touch {
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  border: 1px solid $border;
  .header-tag {
    @include flex(left, center);
    .tag {
      @extend .radius;
      display: block;
      padding: 4px 8px;
      font-size: 12px;
      margin-right: 10px;
      &.green {
        color: $green;
        background-color: $lightgreen;
      }
      &.red {
        color: $red2;
        background-color: $lightred;
      }
      &.yellow {
        color: $orange;
        background-color: $lightyellow;
      }
    }
  }
  .info-box {
    display: inline-block;
    width: 33%;
    margin-top: 10px;
    font-size: 12px;
    line-height: 24px;
    color: #333;
    .icon {
      margin-right: 6px;
      color: $inpcol;
    }
    .get-more {
      @extend .radius;
      display: inline-block;
      cursor: pointer;
      height: 24px;
      line-height: 24px;
      padding: 0 4px 0 10px;
      font-size: 12px;
      margin-left: 10px;
      background-color: $bg;
      color: $txtgray1;
      .icon {
        margin-left: 6px;
      }
    }
    &.long {
      width: 100%;
      margin-top: 4px;
    }
  }
}

.owner-info {
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  border: 1px solid $border;
}
.tab-header {
  position: relative;
  overflow: hidden;
  height: 40px;
  margin-bottom: 10px;
  background-color: $bg;
  &:before {
    content: '';
    position: absolute;
    display: block;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    z-index: 1;
    background-color: $border;
  }
  .tab-btn {
    float: left;
    text-align: center;
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: $bg;
    border-right: 1px solid $border;
    &.cur {
      z-index: 5;
      background-color: $white;
      color: $red2;
    }
  }
}
.tab-show {
  width: 100%;
}
.tab-one {
  table {
    width: 95%;
    margin: 0 auto;
  }
  th,
  td {
    text-align: left;
    vertical-align: top;
    padding: 10px;
    border-bottom: 1px solid $border;
  }
  th {
    width: 140px;
    padding-left: 10px;
    color: $inpcol;
  }
  td {
    width: 280px;
    color: #333;
  }
  tr:last-of-type {
    th,
    td {
      border: none;
    }
  }
  .long {
    width: 700px;
  }
}
.tab-last {
  table {
    width: 95%;
    margin: 0 auto;
  }
  th,
  td {
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid $border;
  }
  th {
    color: $inpcol;
    &:first-of-type {
      width: 100px;
    }
    &:nth-of-type(2) {
      width: 180px;
    }
  }
  tr:last-of-type {
    td {
      border: none;
    }
  }
  .change-box {
    em {
      color: $red2;
    }
  }
}
.tab-list-box {
  width: 95%;
  margin: 0 auto;
  .li {
    line-height: $inpzhong;
    padding-left: 10px;
    border-bottom: 1px solid $border;
    color: #333;
  }
}

.info-list {
  @extend .radius;
  @extend .shadow;
  box-sizing: border-box;
  width: 300px;
  font-size: 14px;
  padding: 10px 15px;
  line-height: 2;
  background-color: $white;
  color: #333;
}
</style>
