<template>
  <div class="menu-page">
    <!-- Header -->
    <div class="menu-header text-center">
      <h1 class="menu-title">Menu</h1>
    </div>

    <!-- Menu Grid -->
    <div class="container menu-container">
      <div class="row justify-content-center">
        <div
          class="col-md-4 col-sm-6"
          v-for="item in menuItems"
          :key="item.name"
        >
          <IceCreamCard
            :image="item.image"
            :name="item.name"
            :price="item.price"
            :rating="item.rating"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/Menu.css'
import IceCreamCard from '../components/IceCreamCard.vue'

const menuItems = [
  { image: new URL('@/images/image1.png', import.meta.url).href, name: 'Coconut Milk Chocolate Chip', price: '5.99', rating: '4.9' },
  { image: new URL('@/images/image2.png', import.meta.url).href, name: 'Almond Joy Sundae', price: '6.49', rating: '4.8' },
  { image: new URL('@/images/image3.png', import.meta.url).href, name: 'Berry Sorbet', price: '4.89', rating: '4.8' },
  { image: new URL('@/images/image4.png', import.meta.url).href, name: 'Chocolate Fudge', price: '5.99', rating: '4.9' },
  { image: new URL('@/images/image5.png', import.meta.url).href, name: 'Dairy Free Classic', price: '6.49', rating: '4.8' },
  { image: new URL('@/images/image6.png', import.meta.url).href, name: 'Dairy Free Almond', price: '4.89', rating: '4.8' },
]
</script>
