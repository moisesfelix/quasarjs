<template>
  <q-layout view="lHh Lpr lFf" class="custom-header">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"
          :isTargetBlank="link.isTargetBlank" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'home',
    icon: 'home',
    link: '/',
    isTargetBlank: false
  },
  {
    title: 'Github',
    caption: 'github.com/moisesfelix',
    icon: 'code',
    link: 'https://github.com/moisesfelix',
    isTargetBlank: true
  },
  {
    title: 'Linkedin',
    caption: 'linkedin.com/in/moisés-felix-606732219/',
    icon: 'public',
    link: 'https://www.linkedin.com/in/mois%C3%A9s-felix-606732219/',
    isTargetBlank: true
  },
  {
    title: 'Sair',
    caption: 'sair',
    icon: 'logout',
    link: '/logout',
    isTargetBlank: false
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style scoped>
.custom-header {
  background-color: white;
  color: black;
}

.custom-header q-toolbar {
  background-color: white;
  /* Defina a cor de fundo desejada */
  color: black;
  /* Defina a cor do texto desejada */
}
</style>
