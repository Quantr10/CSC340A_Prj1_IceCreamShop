<template>
  <div class="card shadow-sm border-0 rounded-3 p-3 mb-3">
    <div class="faq-question d-flex justify-content-between align-items-center" @click="$emit('toggle')">
      <span class="fw-semibold">{{ question }}</span>
      <font-awesome-icon
        :icon="isOpen ? 'chevron-up' : 'chevron-down'"
        class="arrow"
      />
    </div>

    <transition name="slide-fade">
      <div v-if="isOpen" class="faq-answer pt-3 text-muted small">
        <p class="mb-0">{{ answer }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  question: String,
  answer: String,
  isOpen: Boolean,
})
defineEmits(['toggle'])
</script>
