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
          value="departments"
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
        <v-window-item value="departments">
          <DepartmentsTab 
            :department="departments" 
            @update:department="updateDepartments($event)" 
          />
        </v-window-item>
        <v-window-item value="positions">
          <PositionsTab 
            :position="positions"
            @update:position="updatePosition($event)"
          />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DepartmentsTab from '@/modules/department/tab_departmentMange.vue'
import PositionsTab from '@/modules/department/tab_positionManage.vue'
import { useDepartmentStore } from '@/stores/departmentStore'
import { usePositionStore } from '@/stores/positions.store'


const departmentStore = useDepartmentStore()
const positionStore = usePositionStore()

const departments = computed(() => departmentStore.departments)
const positions = computed(() => positionStore.positions)

const tab = ref('departments')

function updateDepartments(newDepartments) {
  departmentStore.setDepartments(newDepartments);
}

function updatePosition(newPositions) {
  positionStore.setPositions(newPositions);
}

onMounted(() => {
  departmentStore.fetchDepartments()
  console.log('Departments fetched:', departments.value)
  positionStore.fetchPositions()
  console.log('Positions fetched:', positions.value)
})

</script>
