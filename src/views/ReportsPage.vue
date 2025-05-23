<template>
  <v-container
    fluid
    class="bg-grey-lighten-4 py-6"
  >
    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="white"
      >
        <v-tab
          value="employees"
          prepend-icon="mdi-account-group"
          @click="tab = 'employees'"
        >
          รายงานบุคคลากร
        </v-tab>
        <v-tab
          value="leaveApproval"
          prepend-icon="mdi-calendar-account"
          @click="tab = 'leaveApproval'"
        >
          ตารางลา
        </v-tab>
      </v-tabs>
    </v-card>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="employees">
          <EmployeesReport />
        </v-window-item>
        <v-window-item value="leaveApproval">
          <LeaveApprovalTable />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import EmployeesReport from '@/modules/reports/tab_employeeReport.vue'
import LeaveApprovalTable from '@/modules/reports/tab_leaveApprovalReport.vue'

const tab = ref('employees') // ค่าเริ่มต้น: รายงานบุคลากร
</script>

<style scoped>
/* เพิ่ม styling ที่จำเป็นได้ที่นี่ */
</style>
