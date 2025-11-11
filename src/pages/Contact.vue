<template>
  <div class="contact-page">
    <div class="contact-header text-center">
      <h1 class="contact-title">Contact Us</h1>
    </div>

    <div class="container contact-container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb-nav mb-4">
        <div class="breadcrumb-wrapper">
          <router-link to="/" class="breadcrumb-link">Home</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Contact Us</span>
        </div>
      </nav>

      <!-- Main Heading -->
      <div class="text-center mb-5">
        <h2 class="main-heading">
          Get in <span class="highlight">Touch</span> With Us
        </h2>
        <p class="subtitle">
          Reach out and connect with us today for any inquiries or assistance!
        </p>
      </div>

      <!-- Two Column Layout -->
      <div class="row g-4">
        <!-- Left Column: Contact Information -->
        <div class="col-lg-6">
          <div class="contact-info-card mb-3">
            <div class="contact-icon-wrapper">
              <font-awesome-icon :icon="contactInfo.location.icon" class="contact-icon" />
            </div>
            <div class="contact-info-content">
              <h3 class="contact-info-title">{{ contactInfo.location.title }}</h3>
              <p class="contact-info-text">{{ contactInfo.location.address }}</p>
            </div>
          </div>

          <div class="contact-info-card mb-3">
            <div class="contact-icon-wrapper">
              <font-awesome-icon :icon="contactInfo.phone.icon" class="contact-icon" />
            </div>
            <div class="contact-info-content">
              <h3 class="contact-info-title">{{ contactInfo.phone.title }}</h3>
              <p 
                v-for="(number, index) in contactInfo.phone.numbers" 
                :key="index" 
                class="contact-info-text"
              >
                {{ number }}
              </p>
            </div>
          </div>

          <div class="contact-info-card">
            <div class="contact-icon-wrapper">
              <font-awesome-icon :icon="contactInfo.email.icon" class="contact-icon" />
            </div>
            <div class="contact-info-content">
              <h3 class="contact-info-title">{{ contactInfo.email.title }}</h3>
              <p 
                v-for="(email, index) in contactInfo.email.emails" 
                :key="index" 
                class="contact-info-text"
              >
                {{ email }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Contact Form -->
        <div class="col-lg-6">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                v-model="form.firstName"
                class="form-control"
                required
              />
            </div>

            <div class="form-group mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                v-model="form.lastName"
                class="form-control"
                required
              />
            </div>

            <div class="form-group mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="form-control"
                required
              />
            </div>

            <div class="form-group mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                class="form-control"
                required
              />
            </div>

            <div class="form-group mb-4">
              <label for="message" class="form-label">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-control"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" class="submit-btn">
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
