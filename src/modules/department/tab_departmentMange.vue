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
            v-model="formDepartment.thainame"
            label="* ชื่อแผนกไทย"
            :messages="isSubmit && !formDepartment.thainame ? ['* จำเป็นต้องกรอก'] : []"
            class="custom-message"
            required
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="formDepartment.engname"
            label="* ชื่อแผนกอังกฤษ"
            :messages="isSubmit && !formDepartment.engname ? ['* จำเป็นต้องกรอก'] : []"
            class="custom-message"
            required
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="formDepartment.shortname"
            label="* ตัวย่อแผนก"
            :messages="isSubmit && !formDepartment.shortname ? ['* จำเป็นต้องกรอก'] : []"
            class="custom-message"
            required
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <v-text-field
            v-model="formDepartment.description"
            label="รายละเอียดแผนก"
          />
        </v-col>
      </v-row>
      <div class="d-flex justify-end w-100">
        <BaseButton
          class="mb-2 me-4"
          variant="secondary"
          @click="clearForm"
        >
          {{ editId ? 'ยกเลิกการแก้ไข' : 'ล้างข้อมูล' }}
        </BaseButton>
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
      <v-card-title class="bg-white text-black text-h6 d-flex align-center justify-space-between">
        <h4>รายการแผนก</h4>
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          label="ค้นหาแผนก"
          single-line
          hide-details
          class="ma-0"
          style="max-width: 300px;"
          @input="onSearch"
        />
      </v-card-title>
      <v-card-text>
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
              <td>{{ item.thainame }}</td>
              <td>{{ item.engname }}</td>
              <td>{{ item.shortname }}</td>
              <td>{{ item.description }}</td>
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
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useDepartmentStore } from '@/stores/departmentStore'

const departmentStore = useDepartmentStore()

const editId = ref(null)
const isSubmit = ref(false)
const search = ref('')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  department: {
    type: Array,
    required: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['update:department'])

const formDepartment = ref({
  thainame: '',
  engname: '',
  shortname: '',
  description: ''
})

const headers = ref([
  { title: 'ชื่อแผนกไทย', key: 'thainame' },
  { title: 'ชื่อแผนกอังกฤษ', key: 'engname' },
  { title: 'ตัวย่อ', key: 'shortname' },
  { title: 'รายละเอียด', key: 'description' },
  { title: 'การจัดการ', key: 'actions', align: 'center',sortable: false }
])


const saveDepartment = async () => {
  isSubmit.value = true

  if (!formDepartment.value.thainame || !formDepartment.value.engname || !formDepartment.value.shortname) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    return 
  }
  await departmentStore.addDepartment(formDepartment.value)
  await departmentStore.fetchDepartments()
  clearForm()
}

function editDepartment(dept) {
  formDepartment.value = {
    thainame: dept.thainame,
    engname: dept.engname,
    shortname: dept.shortname,
    description: dept.description
  }
  editId.value = dept.id
}

async function deleteDepartment(id) {
  if (confirm('คุณต้องการลบแผนกนี้หรือไม่?')) {
    try {
      await departmentStore.deleteDepartment(id)
      await departmentStore.fetchDepartments()
      clearForm()
    } catch (error) {
      console.error('Error deleting department:', error)
    }
  }
}

function clearForm() {
  formDepartment.value = {
    thainame: '',
    engname: '',
    shortname: '',
    description: ''
  }
  editId.value = null
  isSubmit.value = false
}

const onSearch = () => {
  departmentStore.searchDepartments(search.value)
}

onMounted(() => {
 departmentStore.fetchDepartments()
})
</script>

<style scoped>
.bg-white {
  background-color: #ffffff !important;
  color: rgb(0, 0, 0) !important;
}

.bg-navy {
  background-color: #001f3f !important;
  color: rgb(255, 255, 255) !important;
}

.styled-table th,
.styled-table td {
  padding: 12px !important;
  font-size: 14px;
}

.custom-message .v-messages__message {
  font-size: 12px;
  color: red!important;
}

::v-deep .styled-table thead th {
  background-color: #001f3f !important;
  color: rgb(255, 255, 255) !important;
}
</style>
