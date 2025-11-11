<template>
  <div class="contact-page">
    <div class="contact-header text-center">
      <h1 class="contact-title">Contact Us</h1>
    </div>

    <div class="container py-5 px-3">
      <!-- Breadcrumb -->
      <nav class="mb-4 mt-4">
        <div class="d-inline-flex align-items-center bg-light rounded-pill px-3 py-2 small">
          <router-link to="/" class="breadcrumb-link text-decoration-none fw-medium">Home</router-link>
          <span class="mx-2 text-muted">/</span>
          <span class="breadcrumb-current fw-medium">Contact Us</span>
        </div>
      </nav>

      <!-- Main Heading -->
      <div class="text-center mb-5">
        <h2 class="display-4 fw-bold mb-3">
          Get in <span class="highlight">Touch</span> With Us
        </h2>
        <p class="lead text-muted mb-0">
          Reach out and connect with us today for any inquiries or assistance!
        </p>
      </div>

      <!-- Two Column Layout -->
      <div class="row g-4">
        <!-- Left Column: Contact Information -->
        <div class="col-lg-6">
          <div class="contact-info-card d-flex align-items-start bg-light rounded-3 p-4 mb-3">
            <div class="contact-icon-wrapper flex-shrink-0 me-3">
              <font-awesome-icon :icon="contactInfo.location.icon" class="contact-icon text-white" />
            </div>
            <div class="flex-grow-1">
              <h3 class="h5 fw-bold mb-2">{{ contactInfo.location.title }}</h3>
              <p class="contact-info-text mb-0 small text-muted">{{ contactInfo.location.address }}</p>
            </div>
          </div>

          <div class="contact-info-card d-flex align-items-start bg-light rounded-3 p-4 mb-3">
            <div class="contact-icon-wrapper flex-shrink-0 me-3">
              <font-awesome-icon :icon="contactInfo.phone.icon" class="contact-icon text-white" />
            </div>
            <div class="flex-grow-1">
              <h3 class="h5 fw-bold mb-2">{{ contactInfo.phone.title }}</h3>
              <p 
                v-for="(number, index) in contactInfo.phone.numbers" 
                :key="index" 
                class="contact-info-text mb-1 small text-muted"
              >
                {{ number }}
              </p>
            </div>
          </div>

          <div class="contact-info-card d-flex align-items-start bg-light rounded-3 p-4">
            <div class="contact-icon-wrapper flex-shrink-0 me-3">
              <font-awesome-icon :icon="contactInfo.email.icon" class="contact-icon text-white" />
            </div>
            <div class="flex-grow-1">
              <h3 class="h5 fw-bold mb-2">{{ contactInfo.email.title }}</h3>
              <p 
                v-for="(email, index) in contactInfo.email.emails" 
                :key="index" 
                class="contact-info-text mb-1 small text-muted"
              >
                {{ email }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Contact Form -->
        <div class="col-lg-6">
          <form class="bg-white rounded-3 p-4" @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="firstName" class="form-label fw-semibold small">First Name</label>
              <input
                type="text"
                id="firstName"
                v-model="form.firstName"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label for="lastName" class="form-label fw-semibold small">Last Name</label>
              <input
                type="text"
                id="lastName"
                v-model="form.lastName"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label for="email" class="form-label fw-semibold small">Email address</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label fw-semibold small">Phone</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                class="form-control"
                required
              />
            </div>

            <div class="mb-4">
              <label for="message" class="form-label fw-semibold small">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-control"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" class="btn submit-btn w-100 d-inline-flex align-items-center justify-content-center">
              Submit Now
              <font-awesome-icon icon="arrow-right" class="ms-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/Contact.css'
import { ref } from 'vue'
import { contactInfo } from '../data/contactData.js'
import { submitContactForm } from '../utils/contactService.js'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

async function handleSubmit() {
  try {
    const result = await submitContactForm(form.value)
    alert(result.message)
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    }
  } catch (error) {
    alert(error.message || 'Failed to submit form. Please try again.')
  }
}
</script>

<style scoped>
</style>
