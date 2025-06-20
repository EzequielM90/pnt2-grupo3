import { defineStore } from "pinia";
import axios from "axios";

export const useAutenticacionStore = defineStore('autenticacion', {
    state: () => ({
        usuario: null,
        token: localStorage.getItem('token')|| null
    }),
    getters: {
        esAdministrador: (state) => state.usuario?.role === 'administrador',
        tieneAutenticacion: (state) => !!state.token
    },
    actions: {
        async login (email, password){
            try{
                const response = await axios.get("https://68424d30e1347494c31c5ccc.mockapi.io/api/usuarios")
                const usuario = response.data.find(u => u.email === email && u.password === password)

                if (usuario){
                    this.token = usuario.token
                    this.usuario = usuario
                    localStorage.setItem('usuario', JSON.stringify(usuario))
                    localStorage.setItem('token', JSON.stringify(usuario.token))
                } else{
                    console.log("Usuario no encontrado.")
                }
            }catch(error){
                console.error("Error: ", error)
            }
        },
        logout(){
            this.token = null
            this.usuario = null
            localStorage.removeItem('usuario')
            localStorage.removeItem('token')
        }
    }
})