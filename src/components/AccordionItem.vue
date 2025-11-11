<template>
  <div class="faq-card shadow-sm border-0">
    <div class="faq-question" @click="$emit('toggle')">
      <span>{{ question }}</span>
      <font-awesome-icon
        :icon="isOpen ? 'chevron-up' : 'chevron-down'"
        class="arrow"
      />
    </div>

    <transition name="slide-fade">
      <div v-if="isOpen" class="faq-answer">
        <p>{{ answer }}</p>
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
