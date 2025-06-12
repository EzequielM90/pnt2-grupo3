<template>
  <div class="d-flex">
    <nav class="sidebar bg-dark text-white p-3">
      <h4 class="mb-4">Control de Asistencia</h4>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <router-link class="nav-link text-white" to="/">Inicio</router-link>
        </li>
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
          <router-link class="nav-link text-white" to="/informes">Informes</router-link>
        </li>       
        <li class="nav-item mb-2">
          <router-link class="nav-link text-white" to="/configuracion">Configuración</router-link>
        </li>
        <li>
          <router-link class="nav-link text-white" to="/login">Login</router-link>
        </li> 
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  min-height: 100vh;
}
</style>
