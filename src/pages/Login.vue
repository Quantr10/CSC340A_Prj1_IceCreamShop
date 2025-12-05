<template>
  <div class="auth-container">
    <div class="auth-left">
      <div class="mb-5">
         <router-link to="/" class="text-decoration-none text-muted small">&larr; Back to Home</router-link>
      </div>

      <h1 class="auth-title h2">Welcome back!</h1>
      <p class="auth-subtitle small">Enter your Credentials to access your account</p>

      <form @submit.prevent="handleLogin" class="auth-form">
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
          <div class="d-flex justify-content-between align-items-center mb-1">
            <label class="form-label mb-0">Password</label>
            
          </div>
          <input 
            v-model="password" 
            type="password" 
            class="form-control" 
            placeholder="Enter your password" 
            required 
          />
          <a href="#" class="small text-primary text-decoration-none">forgot password</a>
        </div>

        <div class="mb-4 form-check">
          <input type="checkbox" class="form-check-input" id="remember">
          <label class="form-check-label small" for="remember">
            Remember for 30 days
          </label>
        </div>

        <button type="submit" class="btn btn-auth mb-4" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>

        <div class="divider">Or</div>

        <button type="button" class="btn btn-google mb-4" @click="handleGoogleLogin">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20">
          Sign in with Google
        </button>

        <div class="text-center small">
          Don't have an account? 
          <router-link to="/signup" class="fw-bold text-primary text-decoration-none">Sign Up</router-link>
        </div>
      </form>
    </div>

    <div class="auth-right">
      <div class="auth-img-wrapper">
        <img src="../images/icecream-bowl.png" alt="Ice Cream" class="auth-img" />
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/Auth.css';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser, loginWithGoogle } from '../utils/authService';
import { toast } from "vue3-toastify";
import { mergeLocalCartToFirebase } from "@/utils/cartService";

const router = useRouter();
const email = ref('');
const password = ref('');
const isLoading = ref(false);

async function handleLogin() {
  isLoading.value = true;
  try {
    await loginUser(email.value, password.value);

    await mergeLocalCartToFirebase();

    const redirect = localStorage.getItem("redirectAfterLogin");

    if (redirect === "cart") {
      localStorage.removeItem("redirectAfterLogin");
      router.push("/cart");
    } else {
      router.push("/");
    }

  } catch (error) {
    toast(error.message);
  } finally {
    isLoading.value = false;
  }
}


async function handleGoogleLogin() {
  try {
    await loginWithGoogle();

    // Merge local cart
    await mergeLocalCartToFirebase();

    const redirect = localStorage.getItem("redirectAfterLogin");

    if (redirect === "cart") {
      localStorage.removeItem("redirectAfterLogin");
      router.push("/cart");
    } else {
      router.push("/");
    }

  } catch (error) {
    toast(error.message);
  }
}

</script>

