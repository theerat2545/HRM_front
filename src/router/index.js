// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/views/DashboardPage.vue'
import EmployeePage from '@/views/EmployeePage.vue'
import LeaveApprovalPage from '@/views/LeaveApprovalPage.vue'
import ReportsPage from '@/views/ReportsPage.vue'
import DepartmentPage from '@/views/DepartmentPage.vue'
import LoginPage from '@/modules/auth/LoginPage.vue'

const routes = [
  { path: '/', component: DashboardPage },
  { path: '/employees', component: EmployeePage },
  { path: '/department', component: DepartmentPage },
  { path: '/leave-approval', component: LeaveApprovalPage },
  { path: '/reports', component: ReportsPage },
  { path: '/login', component: LoginPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
