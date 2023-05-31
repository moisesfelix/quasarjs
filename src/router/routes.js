import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      },

      {
        path: '/details/:id',
        name: 'details',
        component: () => import('pages/ShowPage.vue')
      },
      {
        path: '/edit/:id',
        name: 'edit',
        component: () => import('pages/EditPage.vue')
      },
      {
        path: '/new',
        name: 'new',
        component: () => import('pages/NewPage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      store.dispatch('logout') // Executa a ação de logout do Vuex Store
      next('/login') // Redireciona para a página de login
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
