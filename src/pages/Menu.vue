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
import { sampleFlavors } from "../utils/seed.js";
import { db } from "@/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

const menuItems = ref([]);

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, "-");
}

async function fetchMenu() {
  // Start with static seed data
  const baseItems = sampleFlavors.map(item => ({
    id: slugify(item.name),
    ...item
  }));

  // Fetch real ratings from Firestore for each product
  for (let item of baseItems) {
    const slug = slugify(item.name);
    
    try {
      // Query all reviews for this product
      const q = query(
        collection(db, "reviews"), 
        where("productId", "==", slug)
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        // Calculate average from reviews
        const reviews = snapshot.docs.map(d => d.data());
        const totalStars = reviews.reduce((sum, r) => sum + Number(r.stars), 0);
        item.rating = Number((totalStars / reviews.length).toFixed(1));
      }
      // else keep the static rating from seed.js
    } catch (error) {
      console.error(`Error fetching rating for ${item.name}:`, error);
      // Keep static rating on error
    }
  }

  menuItems.value = baseItems;
}

onMounted(fetchMenu);
</script>
