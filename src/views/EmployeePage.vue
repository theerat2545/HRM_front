<template>
  <v-container
    fluid
    class="bg-grey-lighten-4 py-6"
  >
    <v-card>
      <BaseButton
        class="mt-4 ms-4 "
        variant="navy"
        @click="openAddEmployee"
      >
        เพิ่มพนักงาน
      </BaseButton>

      <EmployeeList 
        :employees="employees"
        @edit="handleEditEmployee"
      />
    </v-card>

    <EmployeeFormDialog
      v-model:model-value="showFormDialog"
      :employee="selectedEmployee"
      :mode="formMode"
      @save="handleSaveEmployee"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import EmployeeList from '@/modules/employee/EmployeeList.vue'
import EmployeeFormDialog from '@/modules/employee/EmployeeFormDialog.vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()
const showFormDialog = ref(false)
const selectedEmployee = ref(null)
const formMode = ref('add')

const employees = computed(() => employeeStore.employees)


const openAddEmployee = () => {
  formMode.value = 'add'
  selectedEmployee.value = null
  showFormDialog.value = true
}

const handleEditEmployee = (employee) => {
  formMode.value = 'edit'
  selectedEmployee.value = { ...employee }
  showFormDialog.value = true
}

 // ฟังก์ชันสำหรับบันทึกข้อมูลพนักงาน
const handleSaveEmployee = async (employeeData) => {
  if (formMode.value === 'add') {
    await employeeStore.addEmployee(employeeData)
  } else {
    await employeeStore.updateEmployee(employeeData)
  }

  showFormDialog.value = false
}

onMounted(() => {
  employeeStore.fetchEmployees()
  // console.log('EmployeePage mounted, employees:', employees.value)
})
</script>