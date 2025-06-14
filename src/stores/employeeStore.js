import { defineStore } from 'pinia';
import axios from 'axios'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    allEmployees: (state) => state.employees,
  },
  actions: {
    async fetchEmployees() {
      this.isLoading = true
      this.error = null
      try {
        const res = await axios.get('http://localhost:5000/api/employees')
        this.employees = res.data.data
      } catch (err) {
        this.error = err
        console.error('เกิดข้อผิดพลาด:', err)
      } finally {
        this.isLoading = false
      }
    },
    async addEmployee(data) {

      try {
        const res = await axios.post('http://localhost:5000/api/employees/', data)
        this.employees.push(res.data.data)
        console.log(res.data.data)
      } catch (err) {
        this.error = err
        console.error('เกิดข้อผิดพลาดขณะเพิ่มพนักงาน:', err)
      }
    },
    async updateEmployee(id, data) {
      const res = await axios.put(`http://localhost:5000/api/employees/${id}`, data)
      const index = this.employees.findIndex(emp => emp.id === id)
      if (index !== -1) {
        this.employees[index] = res.data
      }
    },
  },
})