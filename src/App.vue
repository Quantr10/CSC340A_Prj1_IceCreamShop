<template>
  <div id="app">
    <Navbar />
    <main class="content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>

<style>

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  padding-top: 90px;
  flex: 1;
}

* {
  font-family: 'Berkshire Swash', cursive;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #fffafc;
  color: #333;
}
</style>