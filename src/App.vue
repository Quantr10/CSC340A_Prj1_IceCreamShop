<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <Navbar />
    <main class="content flex-grow-1">
      <router-view />
    </main>
    <ScrollToTop />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import './assets/App.css'
</script>

<style>
</style>