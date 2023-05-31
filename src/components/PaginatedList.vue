<template>
  <div>
    <ul>
      <li v-for="item in entities" :key="item.id">
        {{ item.name }}
        <q-icon name="visibility" class="icon-eye" @click="redirectToDetails(item.id)" />
      </li>
    </ul>

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
      selectedPage: 1
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
    redirectToDetails(id) {
      // Aqui você pode redirecionar para a nova página passando o ID como parâmetro na URL
      // Por exemplo, se a página de detalhes for "/details", você pode redirecionar para "/details/:id"
      // Substitua a rota e o nome do parâmetro de acordo com a sua implementação
      this.$router.push({ name: 'details', params: { id } })
    }
  }
}
</script>

<style scoped>
.icon-eye {
  cursor: pointer;
  margin-left: 5px;
  color: #777;
}
</style>
