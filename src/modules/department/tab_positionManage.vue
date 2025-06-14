<template>
  <v-container>
    <!-- แบบฟอร์มเพิ่ม/แก้ไขตำแหน่ง -->
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
            v-model="formPosition.departmentId"
            :items="departmentOptions"
            item-title="thainame"
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
            v-model="formPosition.thainame"
            label="ชื่อตำแหน่งไทย"
            :rules="[v => !!v || 'ต้องกรอกชื่อตำแหน่งไทย']"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="formPosition.engname"
            label="ชื่อตำแหน่งอังกฤษ"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="formPosition.shortname"
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

    <!-- ตารางแสดงรายการตำแหน่ง -->
    <v-card>
      <v-card-title class="bg-white text-black text-h6 d-flex align-center justify-space-between">
        <h4>รายการตำแหน่ง</h4>
        <v-text-field
          v-model="searchQuery"
          append-inner-icon="mdi-magnify"
          label="ค้นหา"
          single-line
          hide-details
          class="ma-0"
          style="max-width: 300px;"
        />
      </v-card-title>
      <v-card-text>
        <v-data-table
          class="elevation-2 styled-table"
          :headers="headers"
          :items="position"
          :items-per-page="4"
          density="comfortable"
          hover
        >
          <template #item="{ item }">
            <tr>
              <td>{{ getDepartmentName(item.departmentId) }}</td>
              <td>{{ item.thainame }}</td>
              <td>{{ item.engname }}</td>
              <td>{{ item.shortname }}</td>
              <td class="text-center">
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
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- กล่องยืนยันการลบ -->
    <v-dialog
      v-model="deleteDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h6">
          ยืนยันการลบ
        </v-card-title>
        <v-card-text>
          คุณแน่ใจว่าจะลบตำแหน่ง "{{ positionToDelete?.thaiName || '' }}" นี้หรือไม่?
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
import { ref, computed, onMounted, watch } from 'vue'
import { usePositionStore } from '@/stores/positions.store'
import { useDepartmentStore } from '@/stores/departmentStore'
import BaseButton from '@/components/common/BaseButton.vue'

// Props
const props = defineProps({
  position: {
    type: Array,
    default: () => []
  },
  department: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:positions'])

const positionStore = usePositionStore()
const departmentStore = useDepartmentStore()

const formPosition = ref({
  departmentId: null,
  thainame: '',
  engname: '',
  shortname: ''
})

const editId = ref(null)
const isSubmitting = ref(false)
const searchQuery = ref('')
const deleteDialog = ref(false)
const positionToDelete = ref(null)

const departmentOptions = computed(() => props.department || [])

const headers = [
  { title: 'แผนก', key: 'department' },
  { title: 'ชื่อตำแหน่งไทย', key: 'thainame' },
  { title: 'ชื่อตำแหน่งอังกฤษ', key: 'engname' },
  { title: 'ตัวย่อ', key: 'shortname' },
  { title: 'การจัดการ', key: 'actions', align: 'center', sortable: false }
]

const formValid = computed(() => {
  return !!formPosition.value.departmentId &&
         !!formPosition.value.thainame &&
         !!formPosition.value.shortname
})

const filteredPositions = computed(() => {
  if (!searchQuery.value) return props.position
  const query = searchQuery.value.toLowerCase()
  return props.position.filter(pos =>
    pos.thainame.toLowerCase().includes(query) ||
    pos.engname.toLowerCase().includes(query) ||
    pos.shortname.toLowerCase().includes(query) ||
    getDepartmentName(pos.departmentId).toLowerCase().includes(query)
  )
})

function getDepartmentName(departmentId) {
  const department = departmentOptions.value.find(d => d.id === departmentId)
  return department ? department.thainame : 'ไม่ระบุแผนก'

}

async function savePosition() {
  isSubmitting.value = true
  const payload = {
    departmentId: formPosition.value.departmentId,
    thainame: formPosition.value.thainame,
    engname: formPosition.value.engname,
    shortname: formPosition.value.shortname
  }

  try {
    let updatedPositions = []
    if (editId.value) {
      payload.id = editId.value
      await positionStore.updatePosition(payload)
      updatedPositions = props.position.map(p =>
        p.id === editId.value ? { ...payload } : p
      )
    } else {
      const newId = Date.now()
      await positionStore.addPosition({ ...payload, id: newId })
      updatedPositions = [...props.position, { ...payload, id: newId }]
    }
    emit('update:positions', updatedPositions)
    clearForm()
  } catch (err) {
    console.error('Error saving position:', err)
  } finally {
    isSubmitting.value = false
  }
}

function editPosition(pos) {
  formPosition.value = {
    departmentId: pos.departmentId,
    thainame: pos.thainame,
    engname: pos.engname,
    shortname: pos.shortname
  }
  editId.value = pos.id
}

function confirmDelete(pos) {
  positionToDelete.value = pos
  deleteDialog.value = true
}

async function deletePosition() {
  try {
    await positionStore.deletePosition(positionToDelete.value.id)
    const updated = props.position.filter(p => p.id !== positionToDelete.value.id)
    emit('update:positions', updated)
    clearForm()
  } catch (err) {
    console.error('Error deleting position:', err)
  } finally {
    deleteDialog.value = false
    positionToDelete.value = null
  }
}

function clearForm() {
  formPosition.value = {
    departmentId: null,
    thainame: '',
    engname: '',
    shortname: ''
  }
  editId.value = null
}

onMounted(() => {
  positionStore.fetchPositions()
  departmentStore.fetchDepartments()
})

watch(() => props.position, (newVal) => {
  if (newVal?.length > 0) clearForm()
})
</script>

<style scoped>
.bg-navy {
  background-color: #001f3f !important;
}
.styled-table :deep(th),
.styled-table :deep(td) {
  padding: 12px !important;
  font-size: 14px;
}
</style>
