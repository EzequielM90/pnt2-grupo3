<template>
  <h2 class="text-center mb-4">Dashboard</h2>
  <div class="row">
    
    <div class="container mt-4">
      
    <div class="row g-4" id="tarjeta">
      
      <div class="col-md-4">
        
        <TarjetaResumen :cantidad="presentes" texto="Presentes" color="info"/>
        
      </div>
      <div class="col-md-4">
        <TarjetaResumen :cantidad="ausentes" texto="Ausencias" color="warning" />
      </div>
      <div class="col-md-4">
        <TarjetaResumen cantidad="-" texto="Fichajes fuera de horario" color="secondary" />
      </div>
    </div>
  </div>
  <div class="col-2"></div>
  </div>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <BarChart />
    </div>
    <div class="col-2"></div>
  </div>
  <div class="tabla-fichadas">
    <fichadasDash></fichadasDash>
  </div>
</template>

<script setup>
import TarjetaResumen from "../components/Tarjetas.vue"
import BarChart from "../components/GraficoAusencias.vue";
import fichadasDash from "../components/FichadasDashboard.vue";
import { getResumenHoy } from '../servicios/tarjetasServicios.js';
import { ref, onMounted } from 'vue';


const ausentes = ref(0)
const presentes = ref(0)

onMounted(async () => {
  try {
    const resumen = await getResumenHoy()
    ausentes.value = resumen.ausentes
    presentes.value = resumen.presentes
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
  margin-top: 50px; /* o el valor que prefieras */
}
</style>
