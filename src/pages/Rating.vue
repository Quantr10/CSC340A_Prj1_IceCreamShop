<template>
  <div class="rating-page">

    <div class="rating-header text-center">
      <h1 class="rating-title">Rating</h1>
    </div>

    <div class="container my-5">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-5 text-center">
          <img :src="image" :alt="name" class="icecream-img img-fluid rounded shadow" />
        </div>

        <div class="col-md-5 text-start">
          <h3 class="icecream-name h2 mb-3">{{ name }}</h3>

          <div class="avg-stars d-flex align-items-center gap-2 mb-3">
            <font-awesome-icon
              v-for="n in 5"
              :key="n"
              :icon="['fas', 'star']"
              class="star"
              :class="{ filled: n <= Math.round(avgRating) }"
            />
            <span class="avg-number fw-semibold">{{ avgRating.toFixed(1) }}/5</span>
          </div>

          <p class="icecream-price h5 mb-3">${{ price }}</p>
          <p class="icecream-desc text-muted small">
            Indulge yourself with our handcrafted ice cream made with love and
            the freshest ingredients.
          </p>
        </div>
      </div>
    </div>

    <div class="container text-center mb-5">
      <h2 class="review-title h3 mb-2">
        {{
          hasRated
            ? "Thank you for your feedback!"
            : "Let us know how you think"
        }}
      </h2>
      <p class="review-sub text-muted small mb-4">
        {{
          hasRated
            ? "Redirecting you back to the menu..."
            : "Review Anonymously"
        }}
      </p>

      <div v-if="!hasRated" class="review-form mx-auto">
        <div class="stars d-flex justify-content-center gap-1 mb-4">
          <font-awesome-icon
            v-for="n in 5"
            :key="n"
            :icon="['fas', 'star']"
            class="star"
            :class="{ active: n <= rating }"
            @click="setRating(n)"
          />
        </div>

        <div class="d-flex gap-3 mb-3">
          <div class="flex-grow-1 text-start">
            <label for="firstName" class="form-label fw-semibold small">First Name</label>
            <input
              v-model="firstName"
              id="firstName"
              class="form-control"
            />
          </div>
          <div class="flex-grow-1 text-start">
            <label for="lastName" class="form-label fw-semibold small">Last Name</label>
            <input
              v-model="lastName"
              id="lastName"
              class="form-control"
            />
          </div>
        </div>

        <div class="text-start mb-4">
          <label for="review" class="form-label fw-semibold small">Write your review</label>
          <textarea
            v-model="review"
            id="review"
            class="form-control"
            rows="4"
          ></textarea>
        </div>

        <button class="submit-btn w-100" @click="submitRating">Submit Now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../assets/Rating.css"
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { menuItems } from "../data/menuItems.js"

const route = useRoute()
const router = useRouter()

const name = route.params.name
const item = menuItems.find((i) => i.name === name)

const image = ref(route.query.image || item?.image)
const price = route.query.price || item?.price || "—"

const storedData = JSON.parse(localStorage.getItem("ratings") || "{}")
const current = storedData[name] || { avg: Number(item?.rating || 5), count: 0, total: 0 }

const avgRating = computed(() => current.avg || 5)

const firstName = ref("")
const lastName = ref("")
const rating = ref(0)
const review = ref("")
const hasRated = ref(false)

function setRating(n) {
  rating.value = n
}

function submitRating() {
  if (rating.value === 0) {
    alert("Please select a rating")
    return
  }

  const allRatings = JSON.parse(localStorage.getItem("ratings") || "{}")
  const current = allRatings[name] || { total: 0, count: 0, reviews: [] }

  current.total += rating.value
  current.count += 1
  current.avg = current.total / current.count
  current.reviews.push({
    user: `${firstName.value || "Anonymous"} ${lastName.value || ""}`.trim(),
    stars: rating.value,
    text: review.value,
  })

  allRatings[name] = current
  localStorage.setItem("ratings", JSON.stringify(allRatings))

  hasRated.value = true
  setTimeout(() => router.push("/menu"), 2000)
}
</script>
