<template>
  <div class="home">
    <BaseSearchClass></BaseSearchClass>
    <BaseInput />
    <BaseSearchList></BaseSearchList>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseInput from '@/components/BaseInput.vue'
import BaseSearchClass from '@/components/BaseSearchClass.vue'
import BaseSearchList from '@/components/BaseSearchList.vue'

export default {
  name: 'Home',
  components: {
    BaseInput,
    BaseSearchClass,
    BaseSearchList
  }
}
</script>
