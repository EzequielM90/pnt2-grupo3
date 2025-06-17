<template>
  
  <div class="card text-white h-100 shadow" :class="`bg-${color}`">
    <div class="card-body text-center">
      <h2 class="card-title display-4">{{ cantidad }}</h2>
      <p class="card-text">{{ texto }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cantidad: {
    type: [Number, String],
    required: true
  },
  texto: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'primary' // Bootstrap: primary, danger, success, warning, etc.
  }
})

</script>

<style scoped>

.card-title {
  font-weight: bold;
  
}
</style>
