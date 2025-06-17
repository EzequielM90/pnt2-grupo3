<script setup>
  import { onMounted, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { getFichadas, deleteFichada } from '../servicios/fichadasServicios.js';
  import Paginacion from '../components/Paginacion.vue';

  const fichadas = ref([])
  const router = useRouter()

  const fichadasPorPágina = 10
  const inicio = ref(0)
  const fin = ref(fichadasPorPágina)

  const next = () => {
    inicio.value += fichadasPorPágina
    fin.value += fichadasPorPágina
  }

  const previous = () => {
    inicio.value -= fichadasPorPágina
    fin.value -= fichadasPorPágina
  }

  onMounted(() => {
    obtenerFichadas()
  })

  const obtenerFichadas = async ({empleadoId} = {} ) => {
    try{
      const response = empleadoId ? await getFichadas(empleadoId) : await getFichadas()
      fichadas.value = response.data
    } catch(error){
      console.error("Error en listado de fichadas", error)
    }
  }

  const agregarFichada = () => {
    router.push('/createFichada')
  }

  const editarFichada = (id) => {
    router.push(`/editFichada/${id}`)
  }

  const eliminarFichada = async (fichada) => {
    try {
      console.log("Intentando eliminar fichada con ID:", fichada.id, "del empleado:", fichada.empleadoId);
      await deleteFichada(fichada.empleadoId, fichada.id)
      await obtenerFichadas(fichada.empleadoId)
      alert("Fichada eliminada de la base de datos")
    }catch(error){
      console.error("Error eliminando fichada: ", error)
    }
  }

  const maxLength = computed (() => fichadas.value.length)

</script>

<template>
    <div class ="container mt-4">
      <h1 class="text-center flex-grow-1">Listado de Fichadas</h1>

        <Paginacion 
        @next = "next" 
        @previous = "previous"
        :inicio ="inicio"
        :fin = "fin"
        :maxLength="maxLength"
        class="mb-2"></Paginacion>

      <table class ="table">
        <thead>
            <tr>
                <th>Empleado ID</th>
                <th>Fecha</th>
                <th>Hora de Entrada</th>
                <th>Hora de Salida</th>
                <th>Turno</th>
                <th><button @click="agregarFichada()" class="btn btn-secondary">Nueva Fichada</button></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="fichada in fichadas.slice(inicio,fin)" :key="fichada.id">
                <td>{{ fichada.empleadoId }} </td>
                <td>{{ fichada.fecha }}</td>
                <td>{{ fichada.horaEntrada }} </td>
                <td>{{ fichada.horaSalida }} </td>
                <td>{{ fichada.turno }} </td>
                <td>
                    <button class="btn btn-secondary me-2" @click="editarFichada(fichada.id)">Editar</button>
                    <button class="btn btn-dark" @click="eliminarFichada(fichada)">Eliminar</button>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
</template>