<template>
  <v-data-table
    :headers="headers"
    :items="employees"
    :items-per-page="10"
    class="elevation-1"
  >
    <template #[`item.status`]="{ item }">
      <v-chip
        :color="getStatusColor(item.status)"
        small
      >
        {{ item.status }}
      </v-chip>
    </template>

    <template #[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="emit('edit', item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="danger"
        @click="confirmDelete(item)"
      >
        mdi-delete
      </v-icon>
      <v-icon
        small
        color="primary"
        class="ms-2"
        @click="modalView(item)"
      >
        mdi-eye
      </v-icon>
    </template>
  </v-data-table>
</template>

<script setup>
defineProps({
  employees: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit'])

const headers = [
  // { title: 'ลำดับ', key: 'eno' },
  { title: 'รหัสพนักงาน', key: 'employeeCode' },
  { title: 'ชื่อ', key: 'efirstName' },
  { title: 'นามสกุล', key: 'elastName' },
  { title: 'เมล', key: 'mail' },
  { title: 'แผนก', key: 'department' },
  { title: 'ตำแหน่ง', key: 'position' },
  { title: 'วันที่เริ่มงาน', key: 'startWork' },
  { title: 'อายุงาน', key: 'workAge' },
  { title: 'สถานะ', key: 'status' },
  { title: 'การจัดการ', key: 'actions', sortable: false }
]

const getStatusColor = (status) => {
  return {
    'Active': 'success',
    'Inactive': 'grey'
  }[status] || 'primary'
}

const confirmDelete = (item) => {
  if (confirm(`ยืนยันการลบพนักงาน ${item.firstName} ${item.lastName}?`)) {
    // ในส่วนนี้จะเพิ่มการลบเมื่อมีการเชื่อมต่อ API
    console.log('ควรลบพนักงาน ID:', item.id)
  }
}
</script>
