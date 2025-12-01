<template>
  <div class="card menu-card h-100 border-0 shadow-sm">
    <img :src="image" :alt="name" class="card-img-top menu-img" />

    <div class="card-body text-center d-flex flex-column">
      <h5 class="card-title menu-name">{{ name }}</h5>

      <div class="menu-stars d-flex align-items-center justify-content-center mb-2">
        <font-awesome-icon icon="star" class="star-icon" />
        <span class="rating-number">{{ computedRating }}/5</span>
      </div>

      <p class="menu-price">${{ price }}</p>
      <button class="menu-btn mt-auto" @click="onRate">Rate This</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getAverageRating } from "../utils/ratingService.js";
import "../assets/IceCreamCard.css";

const router = useRouter();

const props = defineProps({
  image: String,
  name: String,
  price: String,
  rating: String,
});

const computedRating = ref(props.rating);

onMounted(async () => {
  try {
    computedRating.value = await getAverageRating(props.name, props.rating);
  } catch (e) {
    console.error("Failed to fetch rating", e);
  }
});

const onRate = () => {
  router.push({
    name: "Rating",
    params: { name: props.name },
    query: {
      image: props.image,
      price: props.price,
      rating: props.rating,
    },
  });
};
</script>
