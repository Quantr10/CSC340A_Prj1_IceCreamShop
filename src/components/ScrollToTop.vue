<template>
  <button
    class="scroll-top-btn"
    type="button"
    @click="scrollToTop"
    aria-label="Scroll to top"
  >
    <font-awesome-icon icon="arrow-up" />
  </button>
</template>

<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import "../assets/ScrollToTop.css";

const route = useRoute();

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Watch for route changes to reset scroll position
watch(
  () => route.path,
  () => {
    // Reset scroll position on route change
    window.scrollTo({ top: 0, behavior: "instant" });
  }
);
</script>

