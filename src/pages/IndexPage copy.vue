<template>
  <q-page class="flex flex-center">
    <paginated-list></paginated-list>
  </q-page>
</template>

<script>
import PaginatedList from '../components/PaginatedList.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    PaginatedList
  }
})
</script>
