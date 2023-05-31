<template>
  <div>
    <button @click="fetchData">Buscar Dados</button>
    <ol type="1">
      <li v-for="item in data" :key="item.id">{{ item.name }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  methods: {
    fetchData() {
      this.$api
        .get('/') // Use o caminho correto da sua API
        .then(response => {
          this.data = response.data.entities
          console.log({
            test: response.data,
            data: this.data
          })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
