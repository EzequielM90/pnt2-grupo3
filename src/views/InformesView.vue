<script setup>
import { ref, onMounted } from 'vue'
import { getRankingAusencias } from '../servicios/rankingAusencias.js'

const ranking = ref([])

onMounted(async () => {
  try {
    ranking.value = await getRankingAusencias()
  } catch (error) {
    console.error('Error al obtener ranking de ausencias:', error)
  }
})
</script>

<template>
  <main class="container mt-4">
    <h1 class="text-success text-center mb-4">Informes</h1>

    <h4 class="text-center mb-3">Ranking de empleados con más ausencias (últimos 7 días hábiles)</h4>

    <table class="table table-bordered table-striped" v-if="ranking.length > 0">
      <thead>
        <tr>
          <th>#</th>
          <th>Empleado</th>
          <th>Ausencias</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in ranking" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.ausencias }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Cargando ranking de ausencias...</p>
  </main>
</template>
