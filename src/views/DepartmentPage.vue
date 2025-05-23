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
          value="department"
          prepend-icon="mdi-bookshelf"
        >
          จัดการแผนก
        </v-tab>
        <v-tab
          value="positions"
          prepend-icon="mdi-account-file"
        >
          จัดการตำแหน่ง
        </v-tab>
      </v-tabs>
    </v-card>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="department">
          <DepartmentsTab :department="sampleDepartments" />
        </v-window-item>
        <v-window-item value="positions">
          <PositionsTab :positions="samplePositions" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import DepartmentsTab from '@/modules/deparment/tab_departmentMange.vue'
import PositionsTab from '@/modules/deparment/tab_positionManage.vue'

const tab = ref('department')

const sampleDepartments = ref([
  { id: 1, thaiName: 'ฝ่ายบุคคล', engName: 'Human Resources', short: 'HR', detail: 'ดูแลทรัพยากรบุคคล' },
  { id: 2, thaiName: 'ฝ่ายไอที', engName: 'Information Technology', short: 'IT', detail: 'ดูแลระบบคอมพิวเตอร์' }
])

const samplePositions = ref([
  { id: 1, thaiName: 'ผู้จัดการ', engName: 'Manager', short: 'MGR', detail: 'ดูแลและบริหารจัดการแผนก', departmentId: 1 },
  { id: 2, thaiName: 'นักพัฒนา', engName: 'Developer', short: 'DEV', detail: 'พัฒนาและดูแลระบบซอฟต์แวร์', departmentId: 2 }
])
</script>
