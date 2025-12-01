<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <div v-if="isOffline" class="alert alert-warning text-center m-0 sticky-top" role="alert">
      <font-awesome-icon icon="triangle-exclamation" class="me-2" />
      You are currently offline. Some features may not work.
    </div>
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
import { ref, onMounted, onUnmounted } from 'vue'

const isOffline = ref(!navigator.onLine)

const updateOnlineStatus = () => {
  isOffline.value = !navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script>

<style>
</style>