<template>
  <div class="menu-page">
    <div class="menu-header text-center">
      <h1 class="menu-title">Menu</h1>
    </div>

    <div class="container my-4 menu-container">
      <div class="row g-4 justify-content-center">
        <div
          class="col-md-4"
          v-for="item in menuItems"
          :key="item.name"
        >
          <div class="card menu-card h-100 border-0 shadow-sm">
            <img
              :src="item.image"
              :alt="item.name"
              class="card-img-top menu-img"
            />

            <div class="card-body text-center">
              <h5 class="card-title menu-name">{{ item.name }}</h5>
              <p class="menu-rating mb-1">
                ⭐ {{ item.rating }}/5
              </p>
              <p class="menu-price mb-2">${{ item.price }}</p>
              <button class="menu-btn px-4 py-2">Rate This</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/Menu.css'

const menuItems = [
  {
    image: new URL('@/images/image1.png', import.meta.url).href,
    name: 'Coconut Milk Chocolate Chip',
    price: '5.99',
    rating: '4.9',
  },
  {
    image: new URL('@/images/image2.png', import.meta.url).href,
    name: 'Almond Joy Sundae',
    price: '6.49',
    rating: '4.8',
  },
  {
    image: new URL('@/images/image3.png', import.meta.url).href,
    name: 'Berry Sorbet',
    price: '4.89',
    rating: '4.8',
  },
  {
    image: new URL('@/images/image4.png', import.meta.url).href,
    name: 'Chocolate Fudge',
    price: '5.99',
    rating: '4.9',
  },
  {
    image: new URL('@/images/image5.png', import.meta.url).href,
    name: 'Dairy Free Classic',
    price: '6.49',
    rating: '4.8',
  },
  {
    image: new URL('@/images/image6.png', import.meta.url).href,
    name: 'Dairy Free Almond',
    price: '4.89',
    rating: '4.8',
  },
];
</script>

<style scoped>
.page {
  text-align: center;
  margin-top: 3rem;
}
</style>
