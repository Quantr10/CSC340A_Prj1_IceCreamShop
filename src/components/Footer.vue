<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Brand Section -->
      <div class="footer-section brand-section">
        <router-link to="/" class="footer-logo">Ice Cream Name</router-link>
        <p class="footer-desc">
          Sweetness in every scoop. Crafted with love and smiles since 2023.
        </p>
      </div>

      <!-- Navigation Section -->
      <div class="footer-section nav-section">
        <h4 class="section-title">Quick Links</h4>
        <nav class="footer-nav">
          <div class="nav-grid">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/menu" class="nav-link">Menu</router-link>
            <router-link to="/faq" class="nav-link">FAQ</router-link>
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </div>
        </nav>
      </div>

      <!-- Contact Section -->
      <div class="footer-section contact-section">
        <h4 class="section-title">Get in Touch</h4>
        <div class="contact-info">
          <div class="contact-item">
            <font-awesome-icon icon="location-dot" class="contact-icon" />
            <span>121 King Street, Melbourne, Australia</span>
          </div>
          <div class="contact-item">
            <font-awesome-icon icon="phone" class="contact-icon" />
            <span>+1 (234) 567-8910</span>
          </div>
          <div class="contact-item">
            <font-awesome-icon icon="envelope" class="contact-icon" />
            <span>info@example.com</span>
          </div>
        </div>
      </div>

      <!-- Social Section -->
      <div class="footer-section social-section">
        <h4 class="section-title">Follow Us</h4>
        <p class="social-desc">Stay connected for sweet updates!</p>

        <div class="social-icons">
          <a href="#" class="social-link" aria-label="Facebook">
            <font-awesome-icon :icon="['fab', 'facebook-f']" />
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
          <a href="#" class="social-link" aria-label="Twitter">
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </a>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p>&copy; 2025 Ice Cream Name. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.footer {
  background: rgba(104, 50, 146, 1);
  color: white;
  padding: 2.5rem 1.5rem 1rem;
  position: relative;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-logo {
  font-family: "Berkshire Swash", cursive;
  font-size: 1.6rem;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

.footer-desc {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  font-size: 0.95rem;
  max-width: 280px;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #fff;
  line-height: 1.6rem;
}

.nav-section {
  gap: 1rem;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: 0.2rem 2rem;
  align-items: start;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.6rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: hotpink;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  line-height: 1.6rem;
}

.contact-icon {
  width: 14px;
  color: hotpink;
  flex-shrink: 0;
}

.social-section {
  gap: 0.8rem;
}

.social-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6rem;
}

.social-icons {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(6px);
  font-size: 0.95rem;
}

.social-link:hover {
  background: hotpink;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 105, 180, 0.3);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  margin-top: 2rem;
  padding-top: 1.2rem;
}

.footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
}
</style>