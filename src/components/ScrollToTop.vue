<template>
  <button
    v-if="isVisible"
    class="scroll-top-btn"
    type="button"
    @click="scrollToTop"
    aria-label="Scroll to top"
  >
    <font-awesome-icon icon="arrow-up" />
  </button>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import "../assets/ScrollToTop.css";

const route = useRoute();
const isVisible = ref(false);

const handleScroll = () => {
  // Show button when scrolled down more than 50px (appears early in scroll)
  isVisible.value = window.scrollY > 50;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Check scroll position on mount and route changes
const checkScrollPosition = () => {
  handleScroll();
};

onMounted(() => {
  // Check initial scroll position
  checkScrollPosition();
  // Add scroll listener
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Watch for route changes to update button visibility
watch(
  () => route.path,
  () => {
    // Reset scroll position on route change
    window.scrollTo({ top: 0, behavior: "instant" });
    // Update button visibility
    setTimeout(() => {
      checkScrollPosition();
    }, 100);
  }
);
</script>

