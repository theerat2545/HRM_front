<template>
  <v-app-bar
    app
    flat
    color="#001f3f"
    dark
  >
    <div class="d-flex align-center me-5 ms-4">
      <img src="@/assets/logo.png" alt="HRSync" height="32" class="ms-4 me-2">
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
import { ref, watch } from 'vue'

const emit = defineEmits(['toggle-sidebar'])

const name = ref('Steve Jobs') 
import { useRoute } from 'vue-router'

const namePage = ref('Dashboard') // ตั้งค่าเริ่มต้น

const route = useRoute()

// อัปเดตชื่อหน้าเมื่อ route เปลี่ยน
watch(
  () => route.name,
  (newName) => {
    namePage.value = newName || 'Dashboard'
  },
  { immediate: true }
)

const toggleSidebar = () => {
  emit('toggle-sidebar')
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

.custom-message .v-messages__message {
  font-size: 12px;
  color: #f44336; /* สีแดงสำหรับข้อความผิดพลาด */
}

.custom-message .v-messages__message--success {
  color: #4caf50; /* สีเขียวสำหรับข้อความสำเร็จ */
}

.custom-message .v-messages__message--info {
  color: #2196f3; /* สีน้ำเงินสำหรับข้อความข้อมูล */
}

.custom-message .v-messages__message--warning {
  color: #ff9800; /* สีส้มสำหรับข้อความเตือน */
}

.custom-message .v-messages__message--error {
  color: #f44336; /* สีแดงสำหรับข้อความผิดพลาด */
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  color: #333;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: left;
}

.styled-table th {
  background-color: #001f3f;
  color: #ffffff;
}

.styled-table tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tr:last-of-type {
  border-bottom: 2px solid #001f3f;
}

.styled-table tr.active-row {
  font-weight: bold;
  color: #001f3f;
}

.styled-table tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.styled-table td {
  font-size: 14px;
  color: #333;
}

.styled-table th,
.styled-table td {
  padding: 12px !important;
  font-size: 14px;
}

.styled-table th {
  background-color: #001f3f !important;
  color: #ffffff !important;
}

.styled-table tr {
  border-bottom: 1px solid #dddddd !important;
}

.styled-table tr:nth-of-type(even) {
  background-color: #f3f3f3 !important;
}

.styled-table tr:last-of-type {
  border-bottom: 2px solid #001f3f !important;
}

.styled-table tr.active-row {
  font-weight: bold !important;
  color: #001f3f !important;
}

.styled-table tr:hover {
  background-color: #f1f1f1 !important;
  cursor: pointer !important;
}
.styled-table td {
  font-size: 14px !important;
  color: #333 !important;
}
</style>