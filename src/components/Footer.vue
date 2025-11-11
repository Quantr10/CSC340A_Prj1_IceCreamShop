<template>
  <footer class="footer text-white py-4">
    <div class="container">
      <div class="row g-4">
        <!-- Brand Section -->
        <div class="col-lg-3 col-md-6">
          <router-link to="/" class="footer-logo d-block mb-3">Ice Cream Name</router-link>
          <p class="footer-desc">
            Sweetness in every scoop. Crafted with love and smiles since 2023.
          </p>
        </div>

        <!-- Navigation Section -->
        <div class="col-lg-2 col-md-6">
          <h4 class="section-title h6 mb-3">Quick Links</h4>
          <nav class="footer-nav">
            <div class="row g-2">
              <div class="col-6">
                <router-link to="/" class="nav-link d-block">Home</router-link>
                <router-link to="/menu" class="nav-link d-block">Menu</router-link>
              </div>
              <div class="col-6">
                <router-link to="/faq" class="nav-link d-block">FAQ</router-link>
                <router-link to="/contact" class="nav-link d-block">Contact</router-link>
              </div>
            </div>
          </nav>
        </div>

        <!-- Contact Section -->
        <div class="col-lg-4 col-md-6">
          <h4 class="section-title h6 mb-3">Get in Touch</h4>
          <div class="contact-info d-flex flex-column gap-2">
            <div class="contact-item d-flex align-items-center">
              <font-awesome-icon icon="location-dot" class="contact-icon me-2" />
              <span>121 King Street, Melbourne, Australia</span>
            </div>
            <div class="contact-item d-flex align-items-center">
              <font-awesome-icon icon="phone" class="contact-icon me-2" />
              <span>+1 (234) 567-8910</span>
            </div>
            <div class="contact-item d-flex align-items-center">
              <font-awesome-icon icon="envelope" class="contact-icon me-2" />
              <span>info@example.com</span>
            </div>
          </div>
        </div>

        <!-- Social Section -->
        <div class="col-lg-3 col-md-6">
          <h4 class="section-title h6 mb-3">Follow Us</h4>
          <p class="social-desc mb-3">Stay connected for sweet updates!</p>
          <div class="social-icons d-flex gap-2">
            <a href="#" class="social-link d-flex align-items-center justify-content-center" aria-label="Facebook">
              <font-awesome-icon :icon="['fab', 'facebook-f']" />
            </a>
            <a href="#" class="social-link d-flex align-items-center justify-content-center" aria-label="Instagram">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="#" class="social-link d-flex align-items-center justify-content-center" aria-label="Twitter">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom border-top border-light border-opacity-25 mt-4 pt-3">
        <div class="text-center">
          <p class="mb-0">&copy; 2025 Ice Cream Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import '../assets/Footer.css'
</script>

<style scoped>
</style>