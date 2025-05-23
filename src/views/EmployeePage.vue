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
        :employees="sampleEmployees"
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
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import EmployeeList from '@/modules/employee/EmployeeList.vue'
import EmployeeFormDialog from '@/modules/employee/EmployeeFormDialog.vue'

// ข้อมูลตัวอย่าง
const sampleEmployees = ref([
  {
    eno: 1,
    employeeCode: 'IT-Dev0001',
    efirstName: 'สมชาย',
    elastName: 'ใจดี',
    mail: 'somchai@mail.com',
    department: 'IT',
    position: 'Developer',
    startWork: '2023-01-01',
    workAge: '1 ปี',
    status: 'Active'
  },
  {
    eno: 2,
    employeeCode: 'HR-M0001',
    efirstName: 'นางสาว',
    elastName: 'ใจดี',
    mail: 'nangsow@mail.com',
    department: 'HR',
    position: 'Manager',
    startWork: '2023-01-01',
    workAge: '1 ปี',
    status: 'Active',
  },
  {
    eno: 3,
    employeeCode: 'IT-Dev0002',
    efirstName: 'นาย',
    elastName: 'ใจดี',
    mail: 'nay@mail.com',
    department: 'IT',
    position: 'Developer',
    startWork: '2023-01-01',
    workAge: '1 ปี',
    status: 'Active',
  },
])

const showFormDialog = ref(false)
const selectedEmployee = ref(null)
const formMode = ref('add')

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

const handleSaveEmployee = (employeeData) => {
  if (formMode.value === 'add') {
    // เพิ่มข้อมูลตัวอย่าง
    sampleEmployees.value.push({
      ...employeeData,
      id: Math.max(...sampleEmployees.value.map(e => e.id)) + 1
    })
  } else {
    // แก้ไขข้อมูลตัวอย่าง
    const index = sampleEmployees.value.findIndex(e => e.id === employeeData.id)
    if (index !== -1) {
      sampleEmployees.value.splice(index, 1, employeeData)
    }
  }
  showFormDialog.value = false
}
</script>