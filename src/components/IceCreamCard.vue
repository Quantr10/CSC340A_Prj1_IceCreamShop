<template>
  <div class="card menu-card h-100 border-0 shadow-sm">
    <img
      :src="image"
      :alt="name"
      class="card-img-top menu-img"
    />

    <div class="card-body text-center d-flex flex-column">
      <h5 class="card-title menu-name">{{ name }}</h5>
      <p class="menu-rating mt-auto">⭐ {{ rating }}/5</p>
      <p class="menu-price">${{ price }}</p>
      <button class="menu-btn mt-auto" @click="onRate">Rate This</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  name: String,
  price: String,
  rating: String,
})

const onRate = () => {
  alert(`You rated ${name}! 🍦`)
}
</script>