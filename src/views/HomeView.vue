<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-2"><h4>tarjeta1</h4></div>
    <div class="col-2"><h4>tarjeta2</h4></div>
    <div class="col-2"><h4>tarjeta3</h4></div>
    <div class="col-2"></div>
  </div>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <BarChart />
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script setup>
import BarChart from "./GraficoAusencias.vue";
</script>
