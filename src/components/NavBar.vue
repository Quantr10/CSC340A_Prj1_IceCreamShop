<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm" style="z-index: 1000;">
    <div class="container">
      <router-link to="/" class="navbar-brand logo">Ice Cream Name</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact-active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/menu" class="nav-link" exact-active-class="active">Menu</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/faq" class="nav-link" exact-active-class="active">FAQ</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link" exact-active-class="active">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import '../assets/NavBar.css'
</script>

<style scoped>
</style>