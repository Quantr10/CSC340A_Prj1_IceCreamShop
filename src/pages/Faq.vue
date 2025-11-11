<template>
  <div class="faq-page">
    <div class="faq-header text-center">
      <h1 class="faq-title">Frequently Asked Questions</h1>
    </div>

    <div class="container my-4 faq-container">
      <div class="row g-4 justify-content-center">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="col-md-8"
        >
          <AccordionItem
            :question="faq.q"
            :answer="faq.a"
            :isOpen="openIndex === index"
            @toggle="toggle(index)"
          />
        </div>
      </div>

      <div class="contact-box text-center mt-5">
        <h3 class="contact-title">Still have questions?</h3>
        <p class="contact-text">We’d love to help! Reach out to us anytime.</p>
        <button class="contact-btn" @click="goToContact">
          Contact Us
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/FAQ.css'
import AccordionItem from '../components/AccordionItem.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { faqs } from '../data/faqs.js'

const router = useRouter()
const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}

function goToContact() {
  router.push('/contact')
}
</script>
