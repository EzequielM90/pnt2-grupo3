<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<template>

  <div class = "d-flex flex-column min-vh-100">
    <div class="d-flex flex-grow-1">
        <Sidebar></Sidebar>
        <main class = "flex-grow-1">
        <router-view />
    </main>
    </div>
    <Footer></Footer>
  </div>
</template>


