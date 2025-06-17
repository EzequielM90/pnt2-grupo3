<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { createFichada, getFichadasById, updateFichada } from '../servicios/fichadasServicios.js';
    import {getEmployees} from '../servicios/personalServicios.js'

    const router = useRouter()
    const route = useRoute()

    const form = ref({
        empleadoId: '',
        fecha: '',
        horaEntrada: '',
        horaSalida: '',
        turno: '',
    })

    const empleados = ref([])

    const isEdit = ref(false)

    const obtenerEmpleados = async () => {
      try{
        const response = await getEmployees()
        empleados.value = response.data
      } catch(error){
        console.error("Error en listado de empleados", error)
      }
    } 

    onMounted(() => {
        obtenerEmpleados()
        if (route.params.id){
            isEdit.value = true
            obtenerFichada(route.params.id)
        }
    })

    const obtenerFichada = async (id) => {
        try{
            const response = await getFichadasById(id)
            form.value = response.data
        }catch(error){
            console.error("Error obteniendo fichada: ", error)
        }
    }

    const submitForm = async() => {

        if(!form.value.empleadoId.trim() && !isEdit.value){
            alert("Por favor, ingresar el ID del empleado")
        }

        if(!form.value.fecha.trim() || !form.value.horaEntrada.trim() || !form.value.horaSalida.trim() || !form.value.turno.trim()){
            alert("Por favor, completar todos los campos antes de guardar")
            return
        }

        try{
            if (isEdit.value){
                await updateFichada(route.params.id, form.value)
                alert("Datos de Fichada actualizados.")
            } else {
                await createFichada(form.value.empleadoId, form.value)
                alert("Fichada creada.")
            }
            router.push('/fichadas')
        }catch(error){
            console.error("Error al guardar: ", error)
        }
    }

</script>

<template>

    <div class="container mt-4">
        <h1>Formulario de Fichadas</h1>
        <form @submit.prevent="submitForm()">
           <div class="mb-3">
              <label class="form-label" for="empleadoId">Empleado</label>
              <select 
                  id="empleadoId" 
                  v-model="form.empleadoId" 
                  class="form-control" 
                  :disabled="isEdit" >
                  <option disabled value="">Seleccione un empleado</option>
                  <option 
                      v-for="empleado in empleados" 
                      :key="empleado.id" 
                      :value="empleado.id"
                  >
                      {{ empleado.nombre }} {{ empleado.apellido }} (ID: {{ empleado.id }})
                  </option>
              </select>
          </div>          
            <div class="mb-3">
                <label class="form-label" for = "fecha">Fecha</label>
                <input id="fecha" v-model="form.fecha" type="text" class="form-control"/>
            </div>
            <div class="mb-3">
                <label class="form-label" for = "horaEntrada">Hora de Entrada</label>
                <input id="horaEntrada" v-model="form.horaEntrada" type="text" class="form-control"/>
            </div>
            <div class="mb-3">
                <label class="form-label" for = "horaSalida">Hora de Salida</label>
                <input id="horaSalida" v-model="form.horaSalida" type="text" class="form-control"/>
            </div>
            <div class="mb-3">
                <label class="form-label" for = "turno">Turno</label>
                <input id="turno" v-model="form.turno" type="text" class="form-control"/>
            </div>
            <button type="submit" class="btn btn-secondary">Guardar</button>
        </form>
    </div>

</template>