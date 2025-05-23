<template>
  <v-navigation-drawer
    app
    color="#001f3f"
    dark
  >
    <v-list
      dense
      class="text-white"
    >
      <v-list-item
        title="Dashboard"
        prepend-icon="mdi-view-dashboard"
        to="/"
      />
      <v-list-item
        title="Employees"
        prepend-icon="mdi-account-group"
        to="/employees"
      />
      <v-list-item
        title="Department"
        prepend-icon="mdi-domain"
        to="/department"
      />
      <v-list-item
        title="Reports"
        prepend-icon="mdi-chart-box"
        to="/reports"
      />
      <v-list-item
        title="LeaveApproval"
        prepend-icon="mdi-note-edit-outline"
        to="/leave-approval"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>

</script>

<style scoped>

</style>
