<template>
  <v-app-bar
    app
    flat
    color="#001f3f"
    dark
  >
    <div class="d-flex align-center me-5 ms-4">
      <img
        src="../../assets/logo.png"
        alt="HRSync"
        height="32"
        class="ms-4 me-2"
      >
      <span class="text-white font-weight-bold">HR Management</span>
    </div>
   
    <v-toolbar-title class="d-flex align-center">
      <v-icon
        class="text-white"
        style="margin-left: 1.5rem;"
        @click="toggleSidebar"
      >
        mdi-menu
      </v-icon>
      <span
        style="color: darkgray;"
        class="ms-4"
      >HRM : {{ namePage }}</span>
    </v-toolbar-title>

    <v-spacer />

    <!-- Search box ที่ปรับแต่งแล้ว -->
    <v-text-field
      density="compact"
      variant="solo"
      flat
      hide-details
      prepend-inner-icon="mdi-magnify"
      placeholder="Search here..."
      class="custom-search-bar mx-4"
      bg-color="white"
    />

    <!-- โปรไฟล์ -->
    <v-avatar
      size="36"
      class="ms-4"
    >
      <img
        src="../../assets/profile.png"
        alt="User"
        height="36"
      >
    </v-avatar>
    <div class="d-flex flex-column justify-center ms-2 text-white me-4">
      <strong>{{ name }}</strong>
      <small class="text-success">● Online</small>
    </div>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toggleSidebar'])

const name = ref('Steve Jobs') 
const namePage = ref(' ')

const toggleSidebar = () => {
  emit('toggleSidebar')
}
</script>

<style scoped>
/* ปรับแต่ง Search Box แบบเต็มรูปแบบ */
.custom-search-bar {
  max-width: 400px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* พื้นหลังและขอบ */
.custom-search-bar .v-field {
  background: white !important;
  border: 1px solid #e0e0e0 !important;
}

/* เมื่อโฟกัส */
.custom-search-bar .v-field--focused {
  border-color: #1976D2 !important;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2) !important;
}

/* ข้อความที่พิมพ์ */
.custom-search-bar input {
  color: #000000 !important;
  caret-color: #1976D2 !important;
}

/* Placeholder */
.custom-search-bar ::placeholder {
  color: rgba(0, 0, 0, 0.6) !important;
}

/* ไอคอนค้นหา */
.custom-search-bar .v-icon {
  color: rgba(0, 0, 0, 0.6) !important;
}

/* เมื่อโฮเวอร์ */
.custom-search-bar:hover .v-field {
  border-color: #bdbdbd !important;
}
</style>