import { createRouter, createWebHistory } from 'vue-router'
import EmployeesForm from '../components/EmployeesForm.vue'
import FichadasForm from '../components/FichadasForm.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue'),},
    { path: '/grafico', name: 'grafico', component: () => import('../components/GraficoAusencias.vue'),},
    { path: '/fichadas', name: 'fichadas', component: () => import('../views/FichadasView.vue'),},
    { path: '/employees', name: 'employees', component: () => import('../views/EmployeesView.vue'),},
    { path: '/horarios', name: 'horarios', component: () => import('../views/HorariosView.vue'),},
    { path: '/informes', name: 'informes', component: () => import('../views/InformesView.vue'),},
    { path: '/configuracion', name: 'configuracion', component: () => import('../views/ConfiguracionView.vue'),},
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'),},
    { path: '/createEmployee', component: EmployeesForm},
    { path: '/editEmployee/:id', component: EmployeesForm},
    { path: '/createFichada', component: FichadasForm },
    { path: '/editFichada/:id', component: FichadasForm}
  ],
})

export default router
