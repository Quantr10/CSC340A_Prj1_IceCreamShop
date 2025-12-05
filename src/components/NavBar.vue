<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm" style="z-index: 1000;">
    <div class="container">
      <router-link to="/" class="navbar-brand logo">Ice Cream Name</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
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

          <li class="nav-item">
            <router-link to="/cart" class="nav-link" exact-active-class="active">Cart</router-link>
          </li>
          
          <!-- Auth Links -->
          <template v-if="!currentUser">
            <li class="nav-item">
              <router-link to="/login" class="nav-link" exact-active-class="active">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/signup" class="nav-link" exact-active-class="active">Sign Up</router-link>
            </li>
          </template>
          <template v-else>
             <li class="nav-item ms-3 dropdown">
              <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="avatar-circle bg-purple text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 30px; height: 30px;">
                  {{ currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U' }}
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                <li><span class="dropdown-item-text text-muted small">{{ currentUser.email }}</span></li>
                <li><hr class="dropdown-divider"></li>
                <li><button class="dropdown-item text-danger" @click="handleLogout">Logout</button></li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import '../assets/NavBar.css'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { subscribeToAuthChanges, logoutUser } from '../utils/authService';

const router = useRouter();
const currentUser = ref(null);

onMounted(() => {
  subscribeToAuthChanges((user) => {
    currentUser.value = user;
  });
});

async function handleLogout() {
  try {
    await logoutUser();
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
</script>

<style scoped>
.avatar-circle {
  font-weight: bold;
  font-size: 0.9rem;
}
</style>
