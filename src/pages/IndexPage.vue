<template>
  <div class="container">
    <q-list>
      <q-item v-for="item in entities" :key="item.id">
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon :name="item.active === 1 ? 'visibility' : 'visibility_off'"
            :class="{ 'icon-eye-green': item.active === 1, 'icon-eye-red': item.active !== 1 }"
            @click="redirectToDetails(item.id)" />
        </q-item-section>
      </q-item>
    </q-list>
    <div class="q-my-md flex justify-center">
      <q-pagination v-model="selectedPage" :min="1" :max="totalPages" @input="updateQueryString"></q-pagination>
    </div>
    <q-fab class="q-mt-md custom-fab" icon="add" color="primary" @click="goToNew"></q-fab>
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
    const currentPage = parseInt(this.$route.query.page) || 1;
    this.selectedPage = currentPage;
    this.currentPage = currentPage;
    this.fetchData();
  },
  watch: {
    selectedPage() {
      this.currentPage = this.selectedPage;
      this.updateQueryString();
      this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      try {
        const perPage = 10;
        const response = await this.$api.get(`/?page=${this.currentPage}&per_page=${perPage}`);
        const responseData = response.data.data;
        if (responseData) {
          this.entities = responseData.entities;
          this.totalPages = responseData.pagination.total_pages;
        }
      } catch (error) {
        console.error(error);
      }
    },
    redirectToDetails(id) {
      this.$router.push({ name: 'details', params: { id }, query: { page: this.currentPage } });
    },
    updateQueryString() {
      this.$router.replace({ query: { page: this.selectedPage } });
    },
    goToNew() {
      this.$router.push({ name: 'new' });
    }
  }
}
</script>

<style scoped>
.icon-eye {
  cursor: pointer;
  margin-left: 5px;
}

.icon-eye-green {
  color: green;
  cursor: pointer;


}

.icon-eye-red {
  color: red;
  cursor: pointer;

}

.container {
  position: relative;
  min-height: 600px;
}

.custom-fab {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>
