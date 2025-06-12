import { createRouter, createWebHistory } from 'vue-router'
import EmployeesForm from '../components/EmployeesForm.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue'),},
    { path: '/fichadas', name: 'fichadas', component: () => import('../views/FichadasView.vue'),},
    { path: '/employees', name: 'employees', component: () => import('../views/EmployeesView.vue'),},
    { path: '/horarios', name: 'horarios', component: () => import('../views/HorariosView.vue'),},
    { path: '/informes', name: 'informes', component: () => import('../views/InformesView.vue'),},
    { path: '/configuracion', name: 'configuracion', component: () => import('../views/ConfiguracionView.vue'),},
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'),},
    { path: '/createEmployee', component: EmployeesForm},
    { path: '/editEmployee/:id', component: EmployeesForm}
  ],
})

export default router
