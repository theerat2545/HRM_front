<template>
  <v-form
    ref="form"
    @submit.prevent="submitForm"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="formData.efirstName"
          label="ชื่อ"
          :rules="[v => !!v || 'กรุณากรอกชื่อ']"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="formData.elastName"
          label="นามสกุล"
          :rules="[v => !!v || 'กรุณากรอกนามสกุล']"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="formData.mail"
          label="อีเมล"
          :rules="[v => !!v || 'กรุณากรอกอีเมล']"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="formData.position"
          :items="store.positions"
          label="ตำแหน่ง"
          :rules="[v => !!v || 'กรุณาเลือกตำแหน่ง']"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="formData.department"
          :items="store.departments"
          label="แผนก"
          :rules="[v => !!v || 'กรุณาเลือกแผนก']"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="formData.startWork"
          label="วันที่เริ่มงาน"
          :rules="[v => !!v || 'กรุณากรอกวันที่เริ่มงาน']"
          required
          type="date"
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="formData.workAge"
          label="อายุงาน"
          readonly
        />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="formData.employeeCode"
          label="รหัสพนักงาน"
          readonly
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { useEmployeeStore } from '../../stores/employeeStore'
import { ref, watch } from 'vue'
import dayjs from 'dayjs'

const store = useEmployeeStore()
// const { positions, departments } = store

const props = defineProps({
  employee: {
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(['submit'])

const form = ref(null)
const formData = ref({
  efirstName: '',
  elastName: '',
  mail: '',
  position: '',
  department: '',
  startWork: '',
  workAge: '',
  employeeCode: '',
  status: 'Active',
  createAt: '',
})

const resetForm = () => {
  formData.value = {
    efirstName: '',
    elastName: '',
    mail: '',
    position: '',
    department: '',
    startWork: '',
    workAge: '',
    employeeCode: '',
    status: 'Active',
    createAt: '',
    updateAt: ''
  }
}


// คำนวณอายุงานเมื่อ startDate เปลี่ยน
const calcWorkAge = (dateStr) => {
  if (dateStr) {
    const start = dayjs(dateStr)
    const now = dayjs()
    const years = now.diff(start, 'year')
    const months = now.diff(start.add(years, 'year'), 'month')
    formData.value.workAge = years > 0
      ? `${years} ปี${months > 0 ? ' ' + months + ' เดือน' : ''}`
      : `${months} เดือน`
  } else {
    formData.value.workAge = ''
  }
}

watch(() => props.employee, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal }
    calcWorkAge(newVal.createdAt || '') // คำนวณอายุงาน
  } else {
    resetForm()
  }
}, { immediate: true })

const submitForm = () => {
  if (form.value.validate()) {
    emit('submit', formData.value)
  }
}

defineExpose({
  submit: submitForm
})

// onMounted (() => {
//   store.fetchPositions()
//   store.fetchDepartments()
// })
</script>
