<template>
  <div class="menu-page">
    <div class="menu-header text-center">
      <h1 class="menu-title">Menu</h1>
    </div>

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
import "../assets/Menu.css";
import IceCreamCard from "../components/IceCreamCard.vue";
import { menuItems } from "../data/menuItems.js";
</script>
