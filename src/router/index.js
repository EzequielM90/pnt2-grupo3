import { createRouter, createWebHistory } from 'vue-router'
import EmployeesForm from '../components/EmployeesForm.vue'
import FichadasForm from '../components/FichadasForm.vue'
import { useAutenticacionStore } from '@/store/autenticacion'
import Login from '@/components/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue'),},
    { path: '/grafico', name: 'grafico', component: () => import('../components/GraficoAusencias.vue'),},
    { path: '/fichadas', name: 'fichadas', component: () => import('../views/FichadasView.vue'),},
    { path: '/employees', name: 'employees', component: () => import('../views/EmployeesView.vue'),},
    { path: '/horarios', name: 'horarios', component: () => import('../views/HorariosView.vue'),},
    { path: '/informes', name: 'informes', component: () => import('../views/InformesView.vue'),},
    { path: '/configuracion', name: 'configuracion', component: () => import('../views/ConfiguracionView.vue'), meta: {requiereAuth: true, role:'administrador'}},
    //{ path: '/configuracion', name: 'configuracion', component: () => import('../views/ConfiguracionView.vue'), meta: {requiereAuth: true, role:'soporte'}},    
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'),},
    { path: '/createEmployee', component: EmployeesForm},
    { path: '/editEmployee/:id', component: EmployeesForm},
    { path: '/createFichada', component: FichadasForm },
    { path: '/editFichada/:id', component: FichadasForm}
  ],
})

router.beforeEach((to, from, next) => {
  const autenticacionStore = useAutenticacionStore()

  if (to.meta.requiereAuth && !autenticacionStore.tieneAutenticacion) {
    next({ name: 'login' })
  }else if (to.meta.role && !autenticacionStore.esAdministrador) {
    next()
  } else {
    next()
  }

})

export default router
