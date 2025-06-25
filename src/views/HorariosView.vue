<script setup>

  import { ref, onMounted, computed } from 'vue';
  import { getHorarios } from '@/servicios/horariosTeoricos.js';
  import Paginacion from '../components/Paginacion.vue';

  const horarios = ref([])
  const horariosPorPágina = 10
  const inicio = ref(0)
  const fin = ref(horariosPorPágina)

  const next = () => {
  inicio.value += horariosPorPágina
  fin.value += horariosPorPágina
  }

  const previous = () => {
  inicio.value -= horariosPorPágina
  fin.value -= horariosPorPágina
  }

  onMounted(() =>{
    obtenerHorarios()
  })

  const obtenerHorarios = async () => {
    try{
      const response = await getHorarios()
      horarios.value = response.data
    } catch(error){
      console.error("Error en listado de horarios", error)
    }
  }
  
  const maxLength = computed (() => horarios.value.length)

</script>

<template>
    <div class ="container mt-4">
      <h1 class="text-center flex-grow-1">Horarios Teóricos</h1>

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
                <th>Hora de Entrada</th>
                <th>Hora de Salida</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="horario in horarios.slice(inicio, fin)" :key="horario.id">
                <td>{{ horario.id_empleado }} </td>
                <td>{{ horario.horaEntrada }} </td>
                <td>{{ horario.horaSalida }} </td>
            </tr>
        </tbody>
      </table>
    </div>
</template>