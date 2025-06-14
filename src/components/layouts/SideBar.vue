<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      app
      color="#001f3f"
      dark
      permanent
    >
      <v-list>
        <v-list-item
          to="/"
          title="Dashboard"
          prepend-icon="mdi-view-dashboard"
        />
        <v-list-item
          to="/employees"
          title="พนักงาน"
          prepend-icon="mdi-account-group"
        />
        <v-list-item
          to="/department"
          title="แผนก"
          prepend-icon="mdi-office-building"
        />
        <v-list-item
          to="/leave-approval"
          title="อนุมัติการลา"
          prepend-icon="mdi-calendar-check"
        />
        <v-list-item
          to="/reports"
          title="รายงาน"
          prepend-icon="mdi-file-chart"
        />
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(true)

</script>

<style scoped>
/* Sidebar สีกรม */
::v-deep .v-navigation-drawer {
  background-color: #001f3f !important;
  color: #fff !important;
  width: 350px !important;
}

</style>