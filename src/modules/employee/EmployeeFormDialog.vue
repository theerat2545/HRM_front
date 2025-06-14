<template>
  <v-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        {{ mode === 'add' ? 'เพิ่มพนักงานใหม่' : 'แก้ไขข้อมูลพนักงาน' }}
      </v-card-title>
      <v-card-text v-if="dialogVisible">
        <EmployeeForm 
          ref="form"
          :employee="employee"
          @submit="handleSubmit"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="grey"
          @click="$emit('update:modelValue', false)"
        >
          ยกเลิก
        </v-btn>
        <v-btn
          color="primary"
          @click="submitForm"
        >
          บันทึก
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import EmployeeForm from './EmployeeForm.vue'

// รับ props และ emit
const props = defineProps({
  modelValue: Boolean,
  employee: {
    type: Object,
    default: () => ({})   
  },
  mode: {
    type: String,
    default: 'add'
  }
})
const emit = defineEmits(['update:modelValue', 'save'])

// ทำตัวกลางสำหรับ v-model
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const submitForm = async () => {
  // เรียก submit method ของ EmployeeForm ผ่าน ref
  if (form.value && form.value.submit) {
    await form.value.submit()
  }
}

// จัดการฟอร์ม
const form = ref(null)
const handleSubmit = (employeeData) => {
  emit('save', employeeData)
  emit('update:modelValue', false)
}
</script>
