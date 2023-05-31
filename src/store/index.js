import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true'
  },
  mutations: {
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
      localStorage.setItem('isAuthenticated', isAuthenticated)
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      // Faça a verificação do nome de usuário e senha aqui
      // Se as credenciais estiverem corretas, defina isAuthenticated como true
      if (username === 'admin' && password === '123456') {
        commit('setAuthenticated', true)
      } else {
        commit('setAuthenticated', false)
      }
    },
    logout({ commit }) {
      // Realize qualquer lógica necessária para fazer logout
      // Por exemplo, limpar os dados de autenticação no armazenamento local
      commit('setAuthenticated', false)
      localStorage.setItem('isAuthenticated', false)
    }
  },
  getters: {
    getIsLogged: state => state.isAuthenticated
  }
})
