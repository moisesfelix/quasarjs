<template>
  <div>
    <ul>
      <li v-for="item in entities" :key="item.id">
        {{ item.name }}
        <q-icon name="remove_red_eye" class="cursor-pointer" @click="openModal(item)" />
      </li>
    </ul>

    <!-- Modal -->
    <q-dialog v-model="showModal">
      <q-card>
        <q-card-section>

          <p>{{ item.name }}</p>
          <p>ID: {{ item.id }}</p>
          <p>Active: {{ item.active }}</p>
          <p>Order: {{ item.order }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Fechar" @click="closeModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-pagination v-model="selectedPage" :min="1" :max="totalPages" @input="currentPage = $event"></q-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      entities: [],
      currentPage: 1,
      totalPages: 1,
      selectedPage: 1,
      showModal: false,
      selectedItem: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    selectedPage() {
      this.currentPage = this.selectedPage
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      try {
        const perPage = 10
        const response = await this.$api.get(`/?page=${this.currentPage}&per_page=${perPage}`)
        const responseData = response.data.data
        if (responseData) {
          this.entities = responseData.entities
          this.totalPages = responseData.pagination.total_pages
        }
      } catch (error) {
        console.error(error)
      }
    },
    openModal(item) {
      this.selectedItem = item
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>
