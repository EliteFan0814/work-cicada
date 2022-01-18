<template>
  <article class="agent-page">
    <div v-if="loading">
      <loading></loading>
    </div>
    <table v-if="!loading">
      <tr>
        <th>代理机构</th>
        <th>申请量</th>
        <th v-for="item in titleData" :key="item">{{item}}年</th>
        <th>10年前</th>
      </tr>
      <tr v-for="(item, index) in tableData" :key="index">
        <td>{{item.key}}</td>
        <td><span class="bold">{{item.buckets['total']}}</span></td>
        <td><span :class="{none: item.buckets[titleData[0]] == 0 }" class="size">{{item.buckets[titleData[0]]}}</span>
        </td>
        <td><span :class="{none: item.buckets[titleData[1]] == 0 }" class="size">{{item.buckets[titleData[1]]}}</span>
        </td>
        <td><span :class="{none: item.buckets[titleData[2]] == 0 }" class="size">{{item.buckets[titleData[2]]}}</span>
        </td>
        <td><span :class="{none: item.buckets[titleData[3]] == 0 }" class="size">{{item.buckets[titleData[3]]}}</span>
        </td>
        <td><span :class="{none: item.buckets[titleData[4]] == 0 }" class="size">{{item.buckets[titleData[4]]}}</span>
        </td>
        <td><span :class="{none: item.buckets[titleData[5]] == 0 }" class="size">{{item.buckets[titleData[5]]}}</span>
        </td>
        <td><span :class="{none: item.buckets[titleData[6]] == 0 }" class="size">{{item.buckets[titleData[6]]}}</span>
        </td>
        <td><span :class="{none: item.buckets[titleData[7]] == 0 }" class="size">{{item.buckets[titleData[7]]}}</span>
        </td>
        <td><span :class="{none: item.buckets[titleData[8]] == 0 }" class="size">{{item.buckets[titleData[8]]}}</span>
        </td>
        <td><span :class="{none: item.buckets[titleData[9]] == 0 }" class="size">{{item.buckets[titleData[9]]}}</span>
        </td>
        <td><span :class="{none: item.buckets['2000'] == 0 }" class="size">{{item.buckets['2000']}}</span></td>
      </tr>
    </table>
  </article>
</template>

<script>
import loading from '@/components/loading'

import { api, kindsList } from '@/assets/js/util.js'

export default {
  components: { loading },
  mounted() {
    this.getDataFn()
  },
  methods: {
    getDataFn() {
      const that = this
      API.get(`/report/report/agent_stats/${this.id}`, {}).then((res) => {
        this.loading = false
        if (res.data.code == 200) {
          this.titleData = res.data.years
          setTimeout(() => {
            that.tableData = res.data.list
          }, 100)
        }
      })
    }
  },
  props: ['nameList', 'id'],
  data() {
    return {
      titleData: [],
      tableData: [],
      loading: true
    }
  }
}
const API = api()
</script>

<style lang="scss" scoped >
@import '@/assets/sass/base.scss';

.agent-page {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 40px;
  table {
    width: 100%;
    th,
    td {
      text-align: center;
      font-size: 12px;
      padding: 10px 0;
      border-bottom: 1px solid $border;
      color: #333;
      &:first-of-type {
        text-align: left;
        width: 290px;
        padding-left: 10px;
      }
    }
    th {
      background-color: $bg;
    }
    .bold {
      font-weight: bold;
    }
    .size {
      &.none {
        color: $inpcol;
      }
    }
  }
}
</style>
