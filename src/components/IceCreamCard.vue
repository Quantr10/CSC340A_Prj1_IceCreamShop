<template>
  <div class="card menu-card h-100 border-0 shadow-sm">
    <img :src="image" :alt="name" class="card-img-top menu-img" />

    <div class="card-body text-center d-flex flex-column">
      <h5 class="card-title menu-name">{{ name }}</h5>

      <div class="menu-stars d-flex align-items-center justify-content-center mb-2">
        <font-awesome-icon icon="star" class="star-icon" />
        <span class="rating-number">{{ displayRating }}/5</span>
      </div>

      <p class="menu-price">${{ price }}</p>
      <!-- Changed to "Add to Cart" which links to ProductDetail -->
      <button class="menu-btn mt-auto" @click="onAddToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { getAverageRating } from "../utils/ratingService.js";
import "../assets/IceCreamCard.css";

const router = useRouter();

const props = defineProps({
  image: String,
  name: String,
  price: String,
  rating: String,
});

const displayRating = ref("0.0");

// Fetch rating when component mounts
onMounted(async () => {
  displayRating.value = await getAverageRating(props.name, 0);
});

// Also watch for name changes (if reused)
watch(() => props.name, async (newName) => {
  displayRating.value = await getAverageRating(newName, 0);
});

const onAddToCart = () => {
  router.push({
    name: "ProductDetail",
    params: { name: props.name },
    query: {
      image: props.image,
      price: props.price
    },
  });
};
</script>
