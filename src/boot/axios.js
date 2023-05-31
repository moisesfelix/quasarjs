import { boot } from 'quasar/wrappers'
import axios from 'axios'

export default boot(({ app }) => {
  const token = '40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8'
  const api = axios.create({
    baseURL: 'https://sys-dev.searchandstay.com/api/admin/house_rules',
    headers: {
      Authorization: `Bearer ${token}` // Substitua 'token' pelo valor do seu token
    }
  })

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})
