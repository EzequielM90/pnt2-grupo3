<script setup>
import { useAutenticacionStore } from '@/store/autenticacion';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const email = ref('')
const password = ref('')
const autenticacionStore = useAutenticacionStore()
const router = useRouter()

const login = async () => {
  await autenticacionStore.login(email.value, password.value)

  if (autenticacionStore.tieneAutenticacion) {
    // Guardamos el rol
    localStorage.setItem('rol', autenticacionStore.esAdministrador ? 'admin' : 'usuario')

    // Redirigimos (por ahora al mismo lugar)
    router.push('/configuracion')
  } else {
    alert("Usuario sin autenticación.")
  }
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8">

      <!-- Formulario de login -->
      <form>
        <div class="mb-3">
          <h1 class="text-center">Iniciar Sesión</h1>
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Contraseña</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <button @click="login" type="button" class="btn btn-secondary">Ingresar</button>
      </form>

      <!-- Recordatorio de usuarios de prueba -->
      <div class="bg-light p-3 border rounded shadow-sm text-center small mt-4">
        <strong>Usuarios de prueba:</strong>
        <ul class="list-unstyled mt-2 mb-0">
          <li>🧑‍💼 Administrador: <code>pdc@cda.com</code> / <code>123456</code></li>
          <li>🛠️ Soporte: <code>zg@cda.com</code> / <code>987654</code></li>
          <li>⏳ Temporal: <code>ll@cda.com</code> / <code>hola</code></li>
        </ul>
      </div>

    </div>
  </div>
</template>



