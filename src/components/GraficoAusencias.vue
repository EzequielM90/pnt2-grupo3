<template>
  <div>
    <h4 class="text-center mb-4">Ausencias de los últimos 7 días</h4>
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    <p v-else>Cargando datos...</p>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { ref, onMounted } from 'vue'
import { getAusenciasPorFecha } from '../servicios/graficoAusencias.js' // ajustá el path si hace falta

// Registrar componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = ref(null)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true
    },
    title: {
      display: false,
      text: 'Ausencias por fecha'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0 // sin decimales
      }
    },
    x: {
      ticks: {
        maxRotation: 45,
        minRotation: 45
      }
    }
  }
}

onMounted(async () => {
  try {
    chartData.value = await getAusenciasPorFecha()
  } catch (error) {
    console.error('Error al obtener datos de ausencias:', error)
  }
})
</script>

<style scoped>
div {
  height: 400px; /* altura del gráfico */
}
</style>
