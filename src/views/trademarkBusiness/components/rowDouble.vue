<template>
  <tr class="row">
    <td class="t-key">{{ name.name1 }}</td>
    <td class="t-value"><slot name="value1"></slot></td>
    <td class="t-key">{{ name.name2 }}</td>
    <td class="t-value"><slot name="value2"></slot></td>
  </tr>
</template>
<script>
export default {
  props: {
    name: {
      type: Object,
      required: true,
      default: () => {
        return { name1: '', name2: '' }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.row {
  width: 100%;
  td {
    border: 1px solid #e5eef6;
    font-size: 14px;
  }
  .t-key {
    border-left: none;
    padding: 20px 40px;
    width: 164px;
    background-color: #f3f9fc;
  }
  .t-value {
    background: #fff;
    padding: 20px 40px;
    color: #5a5e66;
    text-align: left;
  }
}
</style>
