<template>
  <v-container>
    <v-card>
      <v-card-title class="bg-navy text-white text-h6">
        ฟอร์มเพิ่ม/แก้ไขแผนก
      </v-card-title>
      <v-row class="px-4 py-4">
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="departmentNameT"
            label="ชื่อแผนกไทย"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="departmentNameE"
            label="ชื่อแผนกอังกฤษ"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="departmentShort"
            label="ตัวย่อแผนก"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="departmentDetail"
            label="รายละเอียดแผนก"
          />
        </v-col>
      </v-row>
      <div class="d-flex justify-end w-100">
        <BaseButton
          class="mb-2 me-4"
          variant="navy"
          @click="saveDepartment"
        >
          {{ editId ? 'บันทึกการแก้ไข' : 'เพิ่มแผนก' }}
        </BaseButton>
      </div>
    </v-card>

    <v-divider class="my-4" />

    <v-card>
      <v-card-title class="bg-navy text-white text-h6">
        รายการแผนก
      </v-card-title>

      <v-data-table
        class="elevation-2 styled-table"
        show-headers
        :headers="headers"
        :items="department"
        :items-per-page="4"
        density="comfortable"
        hover
      >
        <template #item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.thaiName }}</td>
            <td>{{ item.engName }}</td>
            <td>{{ item.short }}</td>
            <td>{{ item.detail }}</td>
            <td class="text-center">
              <v-tooltip text="แก้ไข">
                <template #activator="{ props: tooltipProps }">
                  <v-btn
                    icon
                    variant="text"
                    v-bind="tooltipProps"
                    @click="editDepartment(item)"
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
                    @click="deleteDepartment(item.id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps({
  department: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:department'])

const departmentNameT = ref('')
const departmentNameE = ref('')
const departmentShort = ref('')
const departmentDetail = ref('')
const editId = ref(null)

const headers = ref([
  { title: 'ลำดับ', key: 'id', align: 'start' },
  { title: 'ชื่อแผนกไทย', key: 'thaiName' },
  { title: 'ชื่อแผนกอังกฤษ', key: 'engName' },
  { title: 'ตัวย่อ', key: 'short' },
  { title: 'รายละเอียด', key: 'detail' },
  { title: 'การจัดการ', key: 'actions', align: 'center',sortable: false }
])

function saveDepartment() {
  if (!departmentNameT.value || !departmentShort.value || !departmentDetail.value) return

  const updated = [...props.department]

  if (editId.value) {
    const idx = updated.findIndex(d => d.id === editId.value)
    if (idx !== -1) {
      updated[idx] = {
        id: editId.value,
        thaiName: departmentNameT.value,
        engName: departmentNameE.value,
        short: departmentShort.value,
        detail: departmentDetail.value
      }
    }
    editId.value = null
  } else {
    updated.push({
      id: Date.now(),
      thaiName: departmentNameT.value,
      engName: departmentNameE.value,
      short: departmentShort.value,
      detail: departmentDetail.value
    })
  }

  emit('update:department', updated)
  clearForm()
}

function editDepartment(dept) {
  departmentNameT.value = dept.thaiName
  departmentNameE.value = dept.engName
  departmentShort.value = dept.short
  departmentDetail.value = dept.detail
  editId.value = dept.id
}

function deleteDepartment(id) {
  const updated = props.department.filter(d => d.id !== id)
  emit('update:department', updated)
  if (editId.value === id) {
    clearForm()
  }
}

function clearForm() {
  departmentNameT.value = ''
  departmentNameE.value = ''
  departmentShort.value = ''
  departmentDetail.value = ''
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
