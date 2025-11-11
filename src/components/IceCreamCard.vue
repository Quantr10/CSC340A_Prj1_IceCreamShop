<template>
  <div class="card menu-card h-100 border-0 shadow-sm">
    <img :src="image" :alt="name" class="card-img-top menu-img" />

    <div class="card-body text-center d-flex flex-column">
      <h5 class="card-title menu-name">{{ name }}</h5>

      <div class="menu-stars">
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
import { computed } from "vue";
import "../assets/IceCreamCard.css";

const router = useRouter();

const props = defineProps({
  image: String,
  name: String,
  price: String,
  rating: String,
});

const computedRating = computed(() => {
  const stored = JSON.parse(localStorage.getItem("ratings") || "{}");
  const data = stored[props.name];
  return data ? data.avg.toFixed(1) : props.rating;
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
