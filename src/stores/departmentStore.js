import { defineStore } from "pinia";
import axios from "axios";

export const useDepartmentStore = defineStore("departments", {
  state: () => ({
    departments: [],
    isLoading: false,
    error: null,
  }),
    getters: {
        allDepartments: (state) => state.departments,
    },
    actions: {
        async fetchDepartments() {
            this.isLoading = true;
            this.error = null;
            try {
                const res = await axios.get("http://localhost:5000/api/departments/");
                this.departments = res.data.data;
            } catch (err) {
                this.error = err;
                console.error("เกิดข้อผิดพลาด:", err);
            } finally {
                this.isLoading = false;
            }
        },
        setDepartments(depts) {
            this.departments = depts;
        },
        async addDepartment(data) {
            const res = await axios.post("http://localhost:5000/api/departments/", data);
            this.departments.push(res.data);
        },
        async updateDepartment(id, data) {
            const res = await axios.put(`http://localhost:5000/api/departments/${id}`, data);
            const index = this.departments.findIndex(dept => dept.id === id);
            if (index !== -1) {
                this.departments[index] = res.data;
            }
        },
        async deleteDepartment(id) {
            await axios.delete(`http://localhost:5000/api/departments/${id}`);
            this.departments = this.departments.filter(dept => dept.id !== id);
        },
         async searchDepartments(query) {
      const res = await axios.get('http://localhost:5000/api/departments/search', {
        params: { query }
      })
      this.departments = res.data
    }
    },
});