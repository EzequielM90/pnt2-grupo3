<script setup>

    defineProps(['inicio', 'fin', 'maxLength'])

    const emit = defineEmits(['next', 'previous'])
</script>

<template>

    <div class="btn-group" role="group" aria-label="Basic example">
        <button @click="emit('previous')" type="button" class="btn btn-outline-secondary" :disabled="inicio === 0">Previous</button>
        <button @click="emit('next')" type="button" class="btn btn-outline-secondary" :disabled="fin >= maxLength">Next</button>
    </div>


</template>