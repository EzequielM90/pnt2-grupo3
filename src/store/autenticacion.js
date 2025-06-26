import { defineStore } from "pinia";
import axios from "axios";

export const useAutenticacionStore = defineStore('autenticacion', {
  state: () => ({
    usuario: null,
    token: null
  }),
  getters: {
    esAdministrador: (state) => state.usuario?.role === 'administrador',
    tieneAutenticacion: (state) => !!state.token
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.get("https://68424d30e1347494c31c5ccc.mockapi.io/api/usuarios")
        const usuario = response.data.find(u => u.email === email && u.password === password)

        if (usuario) {
          this.token = usuario.token
          this.usuario = usuario
        } else {
          console.log("Usuario no encontrado.")
        }
      } catch (error) {
        console.error("Error: ", error)
      }
    },
    logout() {
      this.token = null
      this.usuario = null
    }
  },
  persist: true // 👈 Esto habilita la persistencia automática
})
