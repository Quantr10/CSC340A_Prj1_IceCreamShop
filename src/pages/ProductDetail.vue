<template>
  <div class="product-detail-page">
    <div class="product-header text-center">
      <h1 class="product-detail-title">Product Detail</h1>
    </div>

    <div class="container mb-5">
      <div class="row align-items-start">
        <div class="col-md-6 text-center mb-4 mb-md-0">
          <div class="main-image-wrapper mb-3">
            <img :src="image" :alt="item?.name" class="img-fluid rounded shadow-sm main-img" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="mb-2">
            <div class="d-flex align-items-center gap-1 text-warning small mb-1">
              <font-awesome-icon icon="star" v-for="n in 5" :key="n"
                :class="n <= Math.round(avgRating) ? '' : 'text-muted-light'" />
              <span class="text-muted ms-2">({{ avgRating }}/5)</span>
            </div>
          </div>

          <h2 class="product-name mb-2">{{ item?.name || displayFlavorName }}</h2>
          <h3 class="product-price text-purple fw-bold mb-3">${{ price }}</h3>

          <p class="text-muted mb-4">
            This is a delicious ice cream flavor freshly made with premium
            ingredients.
          </p>

          <div class="mb-4 option-row">
            <span class="option-label">Size:</span>

            <div class="options-wrapper">
              <button class="select-btn circle" :class="{ active: selectedSize === 'Small' }"
                @click="selectedSize = 'Small'">S</button>

              <button class="select-btn circle" :class="{ active: selectedSize === 'Medium' }"
                @click="selectedSize = 'Medium'">M</button>

              <button class="select-btn circle" :class="{ active: selectedSize === 'Large' }"
                @click="selectedSize = 'Large'">L</button>
            </div>
          </div>


          <div class="mb-4 option-row">
            <span class="option-label">Style:</span>

            <div class="options-wrapper">
              <button class="select-btn" :class="{ active: selectedServing === 'Cone' }"
                @click="selectedServing = 'Cone'">Cone</button>

              <button class="select-btn" :class="{ active: selectedServing === 'Cup' }"
                @click="selectedServing = 'Cup'">Cup</button>

              <button class="select-btn" :class="{ active: selectedServing === 'Sandwich' }"
                @click="selectedServing = 'Sandwich'">Sandwich</button>
            </div>
          </div>

          <div class="mb-4 option-row">
            <span class="option-label">Toppings:</span>

            <div class="options-wrapper">
              <button class="select-btn" :class="{ active: selectedTopping === 'Chocolate' }"
                @click="selectedTopping = 'Chocolate'">Chocolate Syrup</button>

              <button class="select-btn" :class="{ active: selectedTopping === 'Strawberry' }"
                @click="selectedTopping = 'Strawberry'">Strawberry Syrup</button>

              <button class="select-btn" :class="{ active: selectedTopping === 'Sprinkle' }"
                @click="selectedTopping = 'Sprinkle'">Sprinkles</button>

              <button class="select-btn" :class="{ active: selectedTopping === 'Oreo' }"
                @click="selectedTopping = 'Oreo'">Oreo Crumbs</button>

              <button class="select-btn" :class="{ active: selectedTopping === 'ChocolateChip' }"
                @click="selectedTopping = 'ChocolateChip'">Chocolate Chip</button>

              <button class="select-btn" :class="{ active: selectedTopping === 'Almond' }"
                @click="selectedTopping = 'Almond'">Almond</button>
            </div>
          </div>

          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="quantity-control d-flex align-items-center border rounded">
              <button class="btn btn-light border-0" @click="qty > 1 ? qty-- : null">
                -
              </button>
              <span class="px-3">{{ qty }}</span>
              <button class="btn btn-light border-0" @click="qty++">+</button>
            </div>
            <button class="btn btn-pink px-4 py-2" @click="addToCart">
              Add to Cart
            </button>
          </div>

          <hr />

          <div class="extra-info mt-3">

            <div class="info-item d-flex align-items-center mb-2">
              <font-awesome-icon icon="box-open" class="info-icon me-2" />
              <span>Free In=state Shipping on All Orders Over $50</span>
            </div>

            <div class="info-item d-flex align-items-center">
              <font-awesome-icon icon="clock" class="info-icon me-2" />
              <span>
                Delivers In: 2–4 Working Days
                <a href="#" class="info-link">Terms & Conditions</a>
              </span>
            </div>

          </div>

        </div>
      </div>

      <div class="inline-rating-section text-center">
        <h2 class="review-title mb-1">Let us know how you think</h2>
        <p class="review-sub mb-4">Review Anonymously</p>

        <div class="stars d-flex justify-content-center gap-2 mb-4">
          <font-awesome-icon v-for="n in 5" :key="n" icon="star" class="star" :class="{ active: n <= userRating }"
            @click="setUserRating(n)" />
        </div>

        <p class="text-muted small">Rating: {{ userRating }}/5</p>

        <div class="review-form mx-auto">
          <div class="d-flex gap-3 mb-3">
            <div class="flex-grow-1 text-start">
              <label class="form-label">First Name</label>
              <input v-model="firstName" class="form-control" />
            </div>

            <div class="flex-grow-1 text-start">
              <label class="form-label">Last Name</label>
              <input v-model="lastName" class="form-control" />
            </div>
          </div>

          <div class="text-start mb-4">
            <label class="form-label">Write your review</label>
            <textarea v-model="userReview" class="form-control" rows="4"></textarea>
          </div>

          <button class="submit-btn" @click="submitInlineReview">
            Submit Now
          </button>
        </div>
      </div>

      <div class="mt-5 pt-5">
        <ul class="nav nav-tabs border-bottom-0 justify-content-center mb-4">
          <li class="nav-item">
            <a class="nav-link border-0" :class="{
              active: activeTab === 'description',
              'text-purple fw-bold border-bottom':
                activeTab === 'description',
              'text-muted': activeTab !== 'description',
            }" href="#" @click.prevent="activeTab = 'description'">
              Description
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link border-0" :class="{
              active: activeTab === 'reviews',
              'text-purple fw-bold border-bottom': activeTab === 'reviews',
              'text-muted': activeTab !== 'reviews',
            }" href="#" @click.prevent="activeTab = 'reviews'">
              Reviews ({{ reviews.length }})
            </a>
          </li>
        </ul>

        <div class="tab-content text-muted small lh-lg">
          <div v-if="activeTab === 'description'">
            <p>
              Enjoy premium-quality ice cream made fresh daily with natural
              ingredients.
            </p>
          </div>

          <div v-if="activeTab === 'reviews'">
            <div v-if="reviews.length === 0" class="text-center py-4">
              <p>No reviews yet. Be the first one!</p>
            </div>

            <div v-else class="reviews-list text-start mx-auto" style="max-width: 800px">
              <div v-for="(review, index) in reviews" :key="index" class="review-item border-bottom py-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="fw-bold text-dark mb-0">{{ review.user }}</h6>
                  <span class="text-muted x-small">{{
                    formatDate(review.createdAt)
                  }}</span>
                </div>

                <div class="small mb-2">
                  <font-awesome-icon icon="star" v-for="n in 5" :key="n" class="review-star"
                    :class="{ active: n <= review.stars }" />
                </div>
                <p class="mb-0 text-secondary">{{ review.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5 pt-5 mb-4">
        <h2 class="related-title">
          Related <span class="text-pink">Products</span>
        </h2>
        <p class="text-muted small">Choose from related flavors</p>
      </div>

      <div class="row g-4">
        <div class="col-md-4" v-for="item in relatedItems" :key="item.id">
          <IceCreamCard :name="item.name" :price="item.price" :image="item.image" :rating="item.rating" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { nextTick } from "vue";

import { useRoute } from "vue-router";
import { db } from "@/firebase.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import IceCreamCard from "../components/IceCreamCard.vue";
import "../assets/ProductDetail.css";
import { toast } from "vue3-toastify";
import { addToCartService } from "../utils/cartService";


const route = useRoute();
const flavorName = route.params.name;

// Helper to match slug from URL with database names
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

// Helper to display pretty name from slug while loading
const displayFlavorName = computed(() => {
  if (!flavorName) return "";
  return flavorName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
});

const item = ref(null);
const image = ref("");
const price = ref(0);
const avgRating = ref(0);
const reviews = ref([]);

const qty = ref(1);
const activeTab = ref("description");

const selectedSize = ref(null);
const selectedServing = ref(null);
const selectedTopping = ref(null);

function getImageUrl(filename) {
  return new URL(`../images/${filename}`, import.meta.url).href;
}

async function fetchFlavor() {
  const snapshot = await getDocs(collection(db, "flavors"));
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (slugify(data.name) === flavorName) {
      item.value = { id: docSnap.id, ...data };
      image.value = getImageUrl(data.image);
      price.value = data.price;
      avgRating.value = data.rating || 0;
      reviews.value = data.reviews || [];
    }
  });
}

const userRating = ref(0);
const firstName = ref("");
const lastName = ref("");
const userReview = ref("");

function setUserRating(n) {
  userRating.value = n;
}

async function submitInlineReview() {
  if (userRating.value === 0) {
    toast("Please select a star rating.");
    return;
  }

  const review = {
    user: `${firstName.value || "Anonymous"} ${lastName.value || ""}`.trim(),
    stars: userRating.value,
    text: userReview.value,
    createdAt: new Date().toISOString(),
  };

  const docRef = doc(db, "flavors", item.value.id);

  const oldCount = reviews.value.length;
  const oldAvg = Number(avgRating.value);
  const newAvg = Number(
    ((oldAvg * oldCount + userRating.value) / (oldCount + 1)).toFixed(1)
  );

  await updateDoc(docRef, {
    reviews: arrayUnion(review),
    rating: newAvg,
  });

  reviews.value.unshift(review);
  avgRating.value = newAvg;

  await nextTick();

  userRating.value = 0;
  firstName.value = "";
  lastName.value = "";
  userReview.value = "";

  toast("Thank you for your review!");
}

const relatedItems = ref([]);
async function fetchRelated() {
  const snapshot = await getDocs(collection(db, "flavors"));
  relatedItems.value = snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((i) => slugify(i.name) !== flavorName)
    .slice(0, 3);
}

function formatDate(dateIso) {
  return new Date(dateIso).toLocaleDateString();
}

function resetSelections() {
  selectedSize.value = null;
  selectedServing.value = null;
  selectedTopping.value = null;
  qty.value = 1;

  // reset rating form nếu muốn
  userRating.value = 0;
  firstName.value = "";
  lastName.value = "";
  userReview.value = "";
}

async function addToCart() {
  if (!selectedSize.value || !selectedServing.value || !selectedTopping.value) {
    toast("Please choose size, style, and topping");
    return;
  }

  const cartItem = {
    flavorId: item.value.id,
    name: item.value.name,
    image: item.value.image,
    price: price.value,
    quantity: qty.value,

    size: selectedSize.value,
    style: selectedServing.value,
    topping: selectedTopping.value,
  };

  try {
    const result = await addToCartService(cartItem);

    if (result.updated) {
      toast("Updated quantity in cart!");
    } else {
      toast("Added new item to cart!");
    }

    resetSelections();

  } catch (error) {
    console.error(error);
    toast("Failed to add to cart.");
  }
}


onMounted(async () => {
  await fetchFlavor();
  await fetchRelated();
});
</script>
