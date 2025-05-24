<template>
  <v-container>
    <!-- ส่วนเพิ่ม/แก้ไขตำแหน่ง -->
    <v-card>
      <v-card-title class="bg-navy text-white text-h6">
        ฟอร์มเพิ่ม/แก้ไขตำแหน่ง
      </v-card-title>
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
            :rules="[v => !!v || 'ต้องเลือกแผนก']"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="positionNameT"
            label="ชื่อตำแหน่งไทย"
            :rules="[v => !!v || 'ต้องกรอกชื่อตำแหน่งไทย']"
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
            :rules="[v => !!v || 'ต้องกรอกตัวย่อตำแหน่ง']"
          />
        </v-col>
      </v-row>
      <div class="d-flex justify-end w-100">
        <BaseButton
          class="mb-2 me-4"
          variant="navy"
          :disabled="!formValid"
          :loading="isSubmitting"
          @click="savePosition"
        >
          {{ editId ? 'บันทึกการแก้ไข' : 'เพิ่มตำแหน่ง' }}
        </BaseButton>
      </div>
    </v-card>

    <v-divider class="my-4" />

    <!-- ส่วนแสดงรายการตำแหน่ง -->
    <v-card>
      <v-card-title class="bg-navy text-white text-h6">
        รายการตำแหน่ง
      </v-card-title>

      <v-card-text>
        <!-- <v-row class="mb-4">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchQuery"
              label="ค้นหาตำแหน่ง"
              prepend-inner-icon="mdi-magnify"
              clearable
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="filterDepartmentId"
              :items="departmentOptions"
              item-title="thaiName"
              item-value="id"
              label="กรองตามแผนก"
              clearable
            />
          </v-col>
        </v-row> -->

        <v-data-table
          :headers="headers"
          :items="filteredPositions"
          :items-per-page="4"
          :search="searchQuery"
          density="comfortable"
          hover
        >
          <template #department="{ item }">
            {{ getDepartmentName(item.departmentId) }}
          </template>
          
          <template #actions="{ item }">
            <div class="text-center">
              <v-tooltip text="แก้ไข">
                <template #activator="{ props: tooltipProps }">
                  <v-btn
                    icon
                    variant="text"
                    v-bind="tooltipProps"
                    @click="editPosition(item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="ลบ">
                <template #activator="{ props: tooltipProps }">
                  <v-btn
                    icon
                    variant="text"
                    color="error"
                    v-bind="tooltipProps"
                    @click="confirmDelete(item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </template>

          <template #no-data>
            <v-alert
              type="info"
              class="ma-4"
            >
              ไม่พบข้อมูลตำแหน่ง
            </v-alert>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Dialog ยืนยันการลบ -->
    <v-dialog
      v-model="deleteDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h6">
          ยืนยันการลบ
        </v-card-title>
        <v-card-text>
          คุณแน่ใจที่จะลบตำแหน่ง "{{ positionToDelete?.thaiName }}" นี้หรือไม่?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey"
            @click="deleteDialog = false"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="error"
            @click="deletePosition"
          >
            ลบ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  department: {
    type: Array,
    required: true,
    default: () => []
  },
  positions: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['update:positions'])

// Form data
const selectedDepartmentId = ref(null)
const positionNameT = ref('')
const positionNameE = ref('')
const positionShort = ref('')
const editId = ref(null)
const isSubmitting = ref(false)

// Filter and search
const searchQuery = ref('')
const filterDepartmentId = ref(null)

// Delete confirmation
const deleteDialog = ref(false)
const positionToDelete = ref(null)

const headers = [
  { title: 'ลำดับ', key: 'id', align: 'start' },
  { title: 'แผนก', key: 'department' },
  { title: 'ชื่อตำแหน่งไทย', key: 'thaiName' },
  { title: 'ชื่อตำแหน่งอังกฤษ', key: 'engName' },
  { title: 'ตัวย่อ', key: 'short' },
  { title: 'การจัดการ', key: 'actions', align: 'center', sortable: false }
]

// Computed properties
const departmentOptions = computed(() => props.department)

const formValid = computed(() => {
  return selectedDepartmentId.value && positionNameT.value && positionShort.value
})

const filteredPositions = computed(() => {
  let result = [...props.positions]
  
  // กรองตามแผนกที่เลือก
  if (filterDepartmentId.value) {
    result = result.filter(p => p.departmentId === filterDepartmentId.value)
  }
  
  return result
})

// Methods
function getDepartmentName(departmentId) {
  const dept = props.department.find(d => d.id === departmentId)
  return dept ? dept.thaiName : 'ไม่ระบุแผนก'
}

async function savePosition() {
  if (!formValid.value) return
  
  isSubmitting.value = true
  
  try {
    const positionData = {
      id: editId.value || Date.now(),
      departmentId: selectedDepartmentId.value,
      thaiName: positionNameT.value,
      engName: positionNameE.value,
      short: positionShort.value
    }

    // ในอนาคตสามารถเรียก API ได้ที่นี่
    // await apiSavePosition(positionData)
    
    const updated = editId.value
      ? props.positions.map(p => p.id === editId.value ? positionData : p)
      : [...props.positions, positionData]

    emit('update:positions', updated)
    clearForm()
  } finally {
    isSubmitting.value = false
  }
}

function editPosition(pos) {
  positionNameT.value = pos.thaiName
  positionNameE.value = pos.engName
  positionShort.value = pos.short
  selectedDepartmentId.value = pos.departmentId
  editId.value = pos.id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function confirmDelete(pos) {
  positionToDelete.value = pos
  deleteDialog.value = true
}

async function deletePosition() {
  try {
    // ในอนาคตสามารถเรียก API ได้ที่นี่
    // await apiDeletePosition(positionToDelete.value.id)
    
    const updated = props.positions.filter(p => p.id !== positionToDelete.value.id)
    emit('update:positions', updated)
    
    if (editId.value === positionToDelete.value.id) {
      clearForm()
    }
  } finally {
    deleteDialog.value = false
    positionToDelete.value = null
  }
}

function clearForm() {
  positionNameT.value = ''
  positionNameE.value = ''
  positionShort.value = ''
  editId.value = null
  selectedDepartmentId.value = null
}

// Watch for department filter change
watch(filterDepartmentId, (newVal) => {
  if (newVal) {
    selectedDepartmentId.value = newVal
  }
})
</script>

<style scoped>
.bg-navy {
  background-color: #001f3f !important;
  color: white !important;
}

.styled-table {
  margin: 16px;
}

.styled-table :deep(th),
.styled-table :deep(td) {
  padding: 12px !important;
  font-size: 14px;
}

.v-table {
  border-radius: 8px;
  overflow: hidden;
}
</style>