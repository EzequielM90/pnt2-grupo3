<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getFichadas, deleteFichada } from '../servicios/fichadasServicios.js';

const fichadas = ref([]);
const router = useRouter();

onMounted(() => {
  obtenerFichadas();
});

const obtenerFichadas = async ({ empleadoId } = {}) => {
  try {
    const response = empleadoId ? await getFichadas(empleadoId) : await getFichadas();

    //  Ordenar por fecha y hora (descendente) y limitar a 5
    const ordenadas = response.data.sort((a, b) => {
      const fechaA = new Date(a.fecha.split("/").reverse().join("-") + 'T' + a.horaEntrada);
      const fechaB = new Date(b.fecha.split("/").reverse().join("-") + 'T' + b.horaEntrada);
      return fechaB - fechaA;
    });

    fichadas.value = ordenadas.slice(0, 3); //  Mostrar solo las 3 más recientes
  } catch (error) {
    console.error("Error en listado de fichadas", error);
  }
};

</script>

<template>
  <div class="container mt-4">
    <h4 class="text-center mb-4">Últimas fichadas</h4> <!--  Título agregado -->

    <table class="table">
      <thead>
        <tr>
          <th>Empleado ID</th>
          <th>Fecha</th>
          <th>Hora de Entrada</th>
          <th>Hora de Salida</th>
          <th>Turno</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="fichada in fichadas" :key="fichada.id">
          <td>{{ fichada.empleadoId }}</td>
          <td>{{ fichada.fecha }}</td>
          <td>{{ fichada.horaEntrada }}</td>
          <td>{{ fichada.horaSalida }}</td>
          <td>{{ fichada.turno }}</td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>
