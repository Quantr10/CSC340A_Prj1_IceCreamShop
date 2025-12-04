<template>
  <div class="menu-page">
    <div class="menu-header text-center">
      <h1 class="menu-title">Menu</h1>
    </div>

    <div class="container py-5">
      <div class="row justify-content-center g-4">
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
import { ref, onMounted } from "vue";
import "../assets/Menu.css";
import IceCreamCard from "../components/IceCreamCard.vue";

import { db } from "@/firebase.js";
import { collection, getDocs } from "firebase/firestore";

const menuItems = ref([]);

async function fetchMenu() {
  const querySnapshot = await getDocs(collection(db, "flavors"));

  menuItems.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

onMounted(fetchMenu);
</script>
