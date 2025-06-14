// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/views/DashboardPage.vue'
import EmployeePage from '@/views/EmployeePage.vue'
import LeaveApprovalPage from '@/views/LeaveApprovalPage.vue'
import ReportsPage from '@/views/ReportsPage.vue'
import DepartmentPage from '@/views/DepartmentPage.vue'
import LoginPage from '@/modules/auth/LoginPage.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: DashboardPage },
  { path: '/employees', name: 'Employees', component: EmployeePage },
  { path: '/department', name: 'Department', component: DepartmentPage },
  { path: '/leave-approval', name: 'LeaveApproval', component: LeaveApprovalPage },
  { path: '/reports', name: 'Reports', component: ReportsPage },
  { path: '/login', name: 'Login', component: LoginPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
