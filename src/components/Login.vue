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
  <form>
    <div class="mb-3">
      <h1>Iniciar Sesión</h1>
      <label for="exampleInputEmail1" class="form-label">Email</label>
      <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Contraseña</label>
      <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" />
    </div>
    <button @click="login" type="button" class="btn btn-secondary">Ingresar</button>
  </form>
</template>
