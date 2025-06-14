<template>
  <v-app>
  <LoginPage v-if="isLoginPage" />
  <HeaderBar
    v-if="!isLoginPage"
    @toggle-sidebar="toggleSidebar"
  />
  <v-main v-if="!isLoginPage">
    <v-container
      fluid
      class="pa-0"
    >
      <v-row no-gutters>
        <v-col
          v-if="drawer"
          :cols="12"
          :md="2"
          class="sidebar"
        >
          <SideBar v-model:drawer="drawer" />
        </v-col>
        <v-col
          :cols="12"
          :md="drawer ? 10 : 12"
        >
          <router-view class="router-view-content" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  </v-app>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import HeaderBar from '@/components/layouts/HeaderBar.vue'
import SideBar from '@/components/layouts/SideBar.vue'
import LoginPage from './modules/auth/LoginPage.vue'

const drawer = ref(false)
const toggleSidebar = () => {
  drawer.value = !drawer.value
}

const route = useRoute()
const isLoginPage = computed(() => route.name === 'Login')


watch(isLoginPage, (val) => {
  drawer.value = !val
}, { immediate: true })

</script>
