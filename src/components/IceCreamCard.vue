<template>
  <div class="card menu-card h-100 border-0 shadow-sm">
    <img :src="getImageUrl(image)" :alt="name" class="card-img-top menu-img" />

    <div class="card-body text-center d-flex flex-column">
      <h5 class="card-title menu-name">{{ name }}</h5>

      <div class="menu-stars d-flex align-items-center justify-content-center mb-2">
        <font-awesome-icon 
          icon="star" 
          v-for="n in 5" 
          :key="n" 
          :class="n <= Math.round(Number(rating)) ? 'text-warning' : 'text-muted'"
          class="star-icon"
        />
        <span class="rating-number ms-1">
          {{ displayRating }}/5
        </span>
      </div>

      <p class="menu-price">${{ price }}</p>

      <button class="menu-btn mt-auto" @click="onAddToCart">Add to Cart</button>
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
  price: [String, Number],
  rating: { type: Number, default: 0 },
});

function getImageUrl(filename) {
  return new URL(`../images/${filename}`, import.meta.url).href;
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

const displayRating = computed(() => {
  return props.rating ? props.rating.toFixed(1) : "0.0";
});

const onAddToCart = () => {
  router.push({
    name: "ProductDetail",
    params: { name: slugify(props.name) },
  });
};
</script>
