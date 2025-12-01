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

watch(
  () => route.path,
  () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
);
</script>

