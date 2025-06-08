<template>
  <v-app>
    <!-- <LoginPage /> -->
    <HeaderBar />
    <v-main>
      <v-container
        fluid
        class="pa-0"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            md="2"
          >
            <SideBar />
          </v-col>
          <v-col cols="12">
            <router-view class="router-view-content" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import HeaderBar from '@/components/layouts/HeaderBar.vue'
import SideBar from '@/components/layouts/SideBar.vue'
// import LoginPage from './modules/auth/LoginPage.vue';
</script>

<style scoped>
/* สำหรับหน้าจอขนาดเล็ก (mobile) */
@media (max-width: 960px) {
  .router-view-content {
    padding: 16px;
  }
}

/* สำหรับหน้าจอขนาดใหญ่ (desktop) */
@media (min-width: 960px) {
  .router-view-content {
    padding: 24px;
  }
}
</style>