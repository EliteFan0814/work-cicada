<template>
  <div class="home">
    <BaseSearchClass></BaseSearchClass>
    <BaseInput />
    <BaseSearchList></BaseSearchList>
    <BaseFilterForm></BaseFilterForm>
    <BaseDownload exl pdf :doc="false"></BaseDownload>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>
