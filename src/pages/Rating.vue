<template>
  <div class="rating-page">
    <div class="rating-header text-center">
      <h1 class="rating-title">Rating</h1>
    </div>

    <div class="container icecream-section">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-5 text-center">
          <img :src="image" :alt="name" class="icecream-img" />
        </div>

        <div class="col-md-5 info-box">
          <h3 class="icecream-name">{{ name }}</h3>

          <div class="avg-stars">
            <font-awesome-icon
              v-for="n in 5"
              :key="n"
              :icon="['fas', 'star']"
              class="star"
              :class="{ filled: n <= Math.round(avgRating) }"
            />
            <span class="avg-number">{{ avgRating.toFixed(1) }}/5</span>
          </div>

          <p class="icecream-price">${{ price }}</p>
          <p class="icecream-desc">
            Indulge yourself with our handcrafted ice cream made with love and
            the freshest ingredients.
          </p>
        </div>
      </div>
    </div>

    <div class="container review-section text-center">
      <h2 class="review-title">
        {{
          hasRated
            ? "Thank you for your feedback!"
            : "Let us know how you think"
        }}
      </h2>
      <p class="review-sub">
        {{
          hasRated
            ? "Redirecting you back to the menu..."
            : "Review Anonymously"
        }}
      </p>

      <div v-if="!hasRated" class="review-form">
        <div class="stars">
          <font-awesome-icon
            v-for="n in 5"
            :key="n"
            :icon="['fas', 'star']"
            class="star"
            :class="{ active: n <= rating }"
            @click="setRating(n)"
          />
        </div>

        <div class="form-row">
          <input v-model="firstName" placeholder="First Name" />
          <input v-model="lastName" placeholder="Last Name" />
        </div>

        <textarea
          v-model="review"
          placeholder="Write your review here..."
        ></textarea>

        <button class="submit-btn" @click="submitRating">Submit Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../assets/Rating.css";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { menuItems } from "../data/menuItems.js";
import { getRating, submitRating as submitRatingService } from "../utils/ratingService.js";

const route = useRoute();
const router = useRouter();

const name = route.params.name;

const item = menuItems.find((i) => i.name === name);

const image = ref(route.query.image || item?.image);
const price = route.query.price || item?.price || "—";

const defaultRating = Number(item?.rating || 5);
const current = getRating(name, defaultRating);

const avgRating = computed(() => current.avg || defaultRating);

const firstName = ref("");
const lastName = ref("");
const rating = ref(0);
const review = ref("");
const hasRated = ref(false);

function setRating(n) {
  rating.value = n;
}

function submitRating() {
  if (rating.value === 0) {
    alert("Please select a rating");
    return;
  }

  try {
    submitRatingService(
      name,
      rating.value,
      firstName.value,
      lastName.value,
      review.value
    );
    hasRated.value = true;
    setTimeout(() => router.push("/menu"), 2000);
  } catch (error) {
    alert(error.message || "Failed to submit rating. Please try again.");
  }
}
</script>
