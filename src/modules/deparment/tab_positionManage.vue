<template>
  <v-container>
    <v-card>
      <v-row class="px-4 py-4">
        <v-col
          cols="12"
          md="3"
        >
          <v-select
            v-model="selectedDepartmentId"
            :items="departmentOptions"
            item-title="thaiName"
            item-value="id"
            label="เลือกแผนก"
            clearable
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="positionNameT"
            label="ชื่อตำแหน่งไทย"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="positionNameE"
            label="ชื่อตำแหน่งอังกฤษ"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="positionShort"
            label="ตัวย่อตำแหน่ง"
          />
        </v-col>
      </v-row>
      <div class="d-flex justify-end w-100">
        <BaseButton
          class="mb-2 me-4"
          variant="navy"
          :disabled="!selectedDepartmentId"
          @click="savePosition"
        >
          {{ editId ? 'บันทึกการแก้ไข' : 'เพิ่มตำแหน่ง' }}
        </BaseButton>
      </div>
    </v-card>

    <v-divider class="my-4" />

    <v-card>
      <v-card-title class="bg-navy text-white text-h6">
        รายการตำแหน่ง ({{ selectedDepartmentName || 'กรุณาเลือกแผนก' }})
      </v-card-title>

      <v-data-table
        class="elevation-2 styled-table"
        show-headers
        :headers="headers.value"
        :items="filteredPositions"
        :items-per-page="5"
        density="comfortable"
        hover
      >
        <template #item="{ item }">
          <div class="text-center">
            <v-tooltip text="แก้ไข">
              <template #activator="{ slotProps }">
                <v-btn
                  icon
                  variant="text"
                  v-bind="slotProps"
                  @click="editPosition(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
        
            <v-tooltip text="ลบ">
              <template #activator="{ slotProps }">
                <v-btn
                  icon
                  variant="text"
                  color="error"
                  v-bind="slotProps"
                  @click="deletePosition(item.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  department: {
    type: Array,
    required: true
  },
  positions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:positions'])

const selectedDepartmentId = ref(null)
const positionNameT = ref('')
const positionNameE = ref('')
const positionShort = ref('')
const editId = ref(null)

const headers = ref([
  { title: 'ลำดับ', key: 'id', align: 'start' },
  { title: 'ชื่อตำแหน่งไทย', key: 'thaiName' },
  { title: 'ชื่อตำแหน่งอังกฤษ', key: 'engName' },
  { title: 'ตัวย่อ', key: 'short' },
  { title: 'การจัดการ', key: 'actions', align: 'center', sortable: false }
])

const departmentOptions = computed(() => props.department)
const selectedDepartmentName = computed(() => {
  const dept = props.department.find(d => d.id === selectedDepartmentId.value)
  return dept ? dept.thaiName : ''
})

const filteredPositions = computed(() =>
  props.positions.filter(p => p.departmentId === selectedDepartmentId.value)
)

function savePosition() {
  if (!selectedDepartmentId.value || !positionNameT.value || !positionShort.value) return

  const updated = [...props.positions]

  if (editId.value) {
    const idx = updated.findIndex(p => p.id === editId.value)
    if (idx !== -1) {
      updated[idx] = {
        id: editId.value,
        departmentId: selectedDepartmentId.value,
        thaiName: positionNameT.value,
        engName: positionNameE.value,
        short: positionShort.value
      }
    }
    editId.value = null
  } else {
    updated.push({
      id: Date.now(),
      departmentId: selectedDepartmentId.value,
      thaiName: positionNameT.value,
      engName: positionNameE.value,
      short: positionShort.value
    })
  }

  emit('update:positions', updated)
  clearForm()
}

function editPosition(pos) {
  positionNameT.value = pos.thaiName
  positionNameE.value = pos.engName
  positionShort.value = pos.short
  selectedDepartmentId.value = pos.departmentId
  editId.value = pos.id
}

function deletePosition(id) {
  const updated = props.positions.filter(p => p.id !== id)
  emit('update:positions', updated)
  if (editId.value === id) {
    clearForm()
  }
}

function clearForm() {
  positionNameT.value = ''
  positionNameE.value = ''
  positionShort.value = ''
  editId.value = null
}
</script>

<style scoped>
.bg-navy {
  background-color: #001f3f !important;
  color: white !important;
}

.styled-table th,
.styled-table td {
  padding: 12px !important;
  font-size: 14px;
}

.table-header {
  background-color: #f4f6f8;
}

.v-table {
  border-radius: 8px;
  overflow: hidden;
}
</style>
