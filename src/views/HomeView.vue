<template>
  <h2 class="text-center mb-4 mt-4">Dashboard</h2>
  <div class="row">
    <div class="container mt-4">
      <div class="row g-4" id="tarjeta">
        <div class="col-md-4">
          <TarjetaResumen :cantidad="presentes" texto="Presentes" color="info" />
        </div>
        <div class="col-md-4">
          <TarjetaResumen :cantidad="ausentes" texto="Ausencias" color="warning" />
        </div>
        <div class="col-md-4">
          <TarjetaResumen :cantidad="ranking.length > 0 ? ranking[0].ausencias : '-'" texto="Máx. ausencias"
            color="secondary" />
        </div>
      </div>
    </div>
  </div>
<div class="container mt-4" v-if="rol === 'admin' || rol === 'usuario'">
  <div class="row">
    
      <div class="col-2"></div>
      <div class="col-8 mb-5">
        <BarChart />
      </div>
      <div class="col-2"></div>
    </div>

    <div class="tabla-fichadas">
      <fichadasDash></fichadasDash>
    </div>
  </div>
</template>

<script setup>
import TarjetaResumen from "../components/Tarjetas.vue"
import BarChart from "../components/GraficoAusencias.vue";
import fichadasDash from "../components/FichadasDashboard.vue";
import { getResumenHoy } from '../servicios/tarjetasServicios.js';
import { getRankingAusencias } from '../servicios/rankingAusencias.js';
import { ref, onMounted } from 'vue';

const ausentes = ref(0)
const presentes = ref(0)
const ranking = ref([])
const rol = ref(localStorage.getItem('rol') || 'Sin rol')
onMounted(async () => {
  try {
    const resumen = await getResumenHoy()
    ausentes.value = resumen.ausentes
    presentes.value = resumen.presentes

    ranking.value = await getRankingAusencias()
  } catch (error) {
    console.error('Error al obtener resumen del día:', error)
  }
})
</script>

<style>
#tarjeta {
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 3%;
}

.tabla-fichadas {
  margin-top: 50px;
}
</style>
