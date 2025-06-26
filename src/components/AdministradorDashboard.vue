<script setup>
    import { useAutenticacionStore } from '../store/autenticacion.js'
    import {useRouter} from 'vue-router'

    const autenticacionStore = useAutenticacionStore()
    const router = useRouter()

    const logout = () => {
        autenticacionStore.logout()
        localStorage.clear()
        router.push('/login')
    }

</script>

<template>
  <div class="admin-dashboard-container text-center">
    <div v-if="autenticacionStore.esAdministrador">
        <h1 class="dashboard-title">Bienvenido Usuario Administrador</h1>
        <p class="user-name">{{ autenticacionStore.usuario.name }}</p>
    </div>
    <div v-else>
        <h1 class="dashboard-title">Bienvenido Usuario</h1>
        <p class="user-name">{{ autenticacionStore.usuario.name }}</p>
    </div>

    <button class="btn btn-secondary" @click="logout">
      Cerrar sesión
    </button>
  </div>
</template>

<style scoped>
.admin-dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.dashboard-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #333;
}

.user-name {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #555;
}

</style>