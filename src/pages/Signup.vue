<template>
  <div class="auth-container">
    <div class="auth-left">
      <div class="mb-5">
         <!-- Optional Logo or Back Link -->
         <router-link to="/" class="text-decoration-none text-muted small">&larr; Back to Home</router-link>
      </div>

      <h1 class="auth-title h2">Get Started Now</h1>
      <p class="auth-subtitle small">Create your account to order delicious ice creams!</p>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input 
            v-model="name" 
            type="text" 
            class="form-control" 
            placeholder="Enter your name" 
            required 
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input 
            v-model="email" 
            type="email" 
            class="form-control" 
            placeholder="Enter your email" 
            required 
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="form-control" 
            placeholder="Min 8 characters" 
            minlength="6"
            required 
          />
        </div>

        <div class="mb-4 form-check">
          <input type="checkbox" class="form-check-input" id="terms" required>
          <label class="form-check-label small" for="terms">
            I agree to the <a href="#" class="text-dark text-decoration-underline">terms & policy</a>
          </label>
        </div>

        <button type="submit" class="btn btn-auth mb-4" :disabled="isLoading">
          {{ isLoading ? 'Creating Account...' : 'Signup' }}
        </button>

        <div class="divider">Or</div>

        <button type="button" class="btn btn-google mb-4" @click="handleGoogleLogin">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20">
          Sign in with Google
        </button>

        <div class="text-center small">
          Have an account? 
          <router-link to="/login" class="fw-bold text-primary text-decoration-none">Sign In</router-link>
        </div>
      </form>
    </div>

    <div class="auth-right">
      <div class="auth-img-wrapper">
        <!-- Using a local image we found in file list -->
        <img src="../images/icecream-bowl.png" alt="Ice Cream" class="auth-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/Auth.css';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser, loginWithGoogle } from '../utils/authService';
import { toast } from "vue3-toastify";

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);

async function handleRegister() {
  isLoading.value = true;
  try {
    await registerUser(email.value, password.value, name.value);
    // Success - redirect to home
    router.push('/');
  } catch (error) {
    toast(error.message);
  } finally {
    isLoading.value = false;
  }
}

async function handleGoogleLogin() {
  try {
    await loginWithGoogle();
    router.push('/');
  } catch (error) {
    toast(error.message);
  }
}
</script>

