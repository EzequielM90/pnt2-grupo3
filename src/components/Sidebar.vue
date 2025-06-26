<template>
  <div class="d-flex">
    <aside class="sidebar bg-dark text-white p-3">
      <nav>
        <h4 class="mb-4">Control de Asistencia</h4>
        <ul class="nav flex-column">

          <!-- Siempre visible -->
          <li class="nav-item mb-2">
            <router-link class="nav-link text-white" to="/">Inicio</router-link>
          </li>

          <!-- Visible solo para ADMIN -->
          <template v-if="autenticacionStore.esAdministrador">
            <li class="nav-item mb-2">
              <router-link class="nav-link text-white" to="/fichadas">Fichadas</router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link class="nav-link text-white" to="/employees">Personal</router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link class="nav-link text-white" to="/horarios">Horarios</router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link class="nav-link text-white" to="/configuracion">Configuración</router-link>
            </li>
          </template>

          <!-- Visible para cualquier usuario autenticado -->
          <li class="nav-item mb-2">
            <router-link class="nav-link text-white" to="/informes">Informes</router-link>
          </li>

          <!-- Visible solo si NO está autenticado -->
          <li class="nav-item mb-2" v-if="!autenticacionStore.tieneAutenticacion">
            <router-link class="nav-link text-white" to="/login">Login</router-link>
          </li>
          <li class="nav-item mb-2" v-if="autenticacionStore.tieneAutenticacion">
            <button class="btn btn-secondary" @click="logout">
                Cerrar sesión
            </button>
          </li>

        </ul>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { useAutenticacionStore } from '@/store/autenticacion'

import {useRouter} from 'vue-router'

    
const router = useRouter()

const autenticacionStore = useAutenticacionStore()
const logout = () => {
        autenticacionStore.logout()
        localStorage.clear()
        router.push('/login')
    }
</script>
