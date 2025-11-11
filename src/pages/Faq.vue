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

const router = useRouter()
const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}

function goToContact() {
  router.push('/contact')
}

const faqs = [
  { q: 'What are your opening hours?', a: 'We’re open every day from 11 AM to 9 PM, with extended hours in summer.' },
  { q: 'Do you offer vegan or dairy-free ice cream?', a: 'Yes! We have rotating vegan sorbets and dairy-free almond and coconut milk flavors.' },
  { q: 'Do you provide catering for events?', a: 'Yes, we offer catering for parties and corporate events. Contact us for custom options!' },
  { q: 'Are there gluten-free options available?', a: 'Most of our ice creams are gluten-free. Please ask our staff for safe topping choices.' },
  { q: 'Do you take online orders?', a: 'Yes, you can place online orders for pickup or delivery directly from our website.' },
  { q: 'Can I customize my ice cream cake?', a: 'Absolutely! You can pre-order custom cakes 48 hours in advance.' },
  { q: 'How do you ensure freshness?', a: 'We make our ice cream in small batches daily, ensuring every scoop is creamy and fresh.' },
  { q: 'What payment methods do you accept?', a: 'We accept cash, credit/debit cards, and contactless payments like Apple Pay and Google Pay.' },
]
</script>
