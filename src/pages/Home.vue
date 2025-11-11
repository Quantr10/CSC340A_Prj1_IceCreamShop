<template>
  <div class="home-page">
    <section class="hero-section py-5">
      <div class="hero-decoration hero-decoration-left"></div>
      <div class="hero-decoration hero-decoration-right"></div>
      <div class="hero-dots hero-dots-one"></div>
      <div class="hero-dots hero-dots-two"></div>
      <div class="container position-relative">
        <div class="row align-items-center">
          <div class="col-lg-6 text-center text-lg-start">
            <h1 class="hero-title mb-3">Vegan Ice Cream Delights</h1>
            <p class="hero-text mb-4 mx-auto mx-lg-0">
              Discover a world of tasty vegan ice cream flavors and desserts that everyone can enjoy.
            </p>
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <a class="btn hero-cta-btn px-4 py-2" href="#popular">Explore Our Vegan Flavors</a>
              <router-link to="/menu" class="btn btn-outline-light hero-cta-secondary px-4 py-2">See Our Menu</router-link>
            </div>
          </div>
          <div class="col-lg-6 mt-5 mt-lg-0">
            <div class="hero-images position-relative mx-auto">
              <span class="hero-discount-badge"><strong>20%</strong><small>OFF</small></span>
              <span class="hero-curved-line"></span>
              <img class="hero-main" :src="heroMain" alt="Strawberry vegan ice cream pint" />
              <img class="hero-secondary" :src="heroSecondary" alt="Chocolate vegan ice cream pint" />
              <img class="hero-extra" :src="heroScoops" alt="Scoops of vegan ice cream" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="popular" class="py-5 popular-section">
      <div class="container">
        <div class="text-center mb-5 mx-auto" style="max-width: 640px;">
          <h2 class="section-title display-5 fw-bold mb-3">
            Our Popular <span class="highlight">Vegan</span> Treats
          </h2>
          <p class="section-subtitle text-muted mb-0">Check out our favorite vegan ice cream flavors.</p>
        </div>
        <div class="position-relative">
          <div class="row g-4">
            <div class="col-md-4" v-for="item in popularTreats" :key="`popular-${item.name}`">
              <IceCreamCard :image="item.image" :name="item.name" :price="item.price" :rating="item.rating" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="guilt-free" class="py-5 guilt-free-section">
      <div class="container">
        <div class="row align-items-center gy-4">
          <div class="col-lg-6">
            <img
              class="img-fluid rounded-4 shadow guilt-free-img"
              :src="iceCreamBowlImg"
              alt="Assorted vegan ice cream pints"
            />
          </div>
          <div class="col-lg-6">
            <h2 class="section-title">
              Our Guilt-Free <span class="highlight">Vegan</span> Ice Cream
            </h2>
            <p class="section-text">
              Enjoy creamy, dairy-free ice cream that's both tasty and kind to the planet. Delicious flavors made with
              only the best plant-based ingredients.
            </p>
            <ul class="list-unstyled mb-4">
              <li class="fw-semibold mb-2" style="color: #4f3c72;">• Dairy-free and gluten-friendly options</li>
              <li class="fw-semibold mb-2" style="color: #4f3c72;">• Crafted with organic, fair-trade ingredients</li>
              <li class="fw-semibold mb-2" style="color: #4f3c72;">• Small-batch flavors that rotate seasonally</li>
            </ul>
            <router-link to="/menu" class="btn hero-cta-btn px-4 py-2">See Our Menu</router-link>
            
          </div>
        </div>
      </div>
    </section>

    <section id="best" class="py-5 best-section">
      <div class="container">
        <div class="text-center mb-5 mx-auto" style="max-width: 640px;">
          <h2 class="section-title display-5 fw-bold mb-3">
            Best <span class="highlight">Vegan</span> Ice Creams
          </h2>
          <p class="section-subtitle text-muted mb-0">Our best-selling vegan ice creams and desserts.</p>
        </div>
        <div class="position-relative">
          <div class="row g-4">
            <div class="col-md-4" v-for="item in bestSellers" :key="`best-${item.name}`">
              <IceCreamCard :image="item.image" :name="item.name" :price="item.price" :rating="item.rating" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 testimonial-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="testimonial-card text-center p-5 bg-white rounded-5 shadow-lg">
              <div class="d-flex justify-content-center gap-1 mb-3">
                <font-awesome-icon icon="star" class="star-icon" style="color: #ffb433; font-size: 1.1rem;" />
                <font-awesome-icon icon="star" class="star-icon" style="color: #ffb433; font-size: 1.1rem;" />
                <font-awesome-icon icon="star" class="star-icon" style="color: #ffb433; font-size: 1.1rem;" />
                <font-awesome-icon icon="star" class="star-icon" style="color: #ffb433; font-size: 1.1rem;" />
                <font-awesome-icon icon="star" class="star-icon" style="color: #ffb433; font-size: 1.1rem;" />
              </div>
              <p class="testimonial-quote fst-italic mb-4" style="color: #5b4c7a; line-height: 1.6;">
                "Delate vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas aspernatur aut odit aut fugit,
                sed quia dolores eos qui ratione voluptatem sequi nesciunt."
              </p>
              <h5 class="testimonial-name fw-bold mb-1" style="color: #3c2e5c;">Fergus Douchebag</h5>
              <p class="testimonial-role mb-4 small" style="color: #8c7aaa;">Happy Customer</p>
              <div class="d-flex justify-content-center gap-3">
                <img
                  v-for="(avatar, index) in avatars"
                  :key="`avatar-${index}`"
                  :src="avatar"
                  alt="Happy customer"
                  class="avatar-img rounded-circle border-3 border-white shadow"
                  style="width: 56px; height: 56px; object-fit: cover;"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import IceCreamCard from "../components/IceCreamCard.vue";
import iceCreamBowlImg from "@/images/icecream-bowl.png";
import { heroImages, popularTreats, bestSellers, avatars } from "../data/homeData.js";
import "../assets/Home.css";

const heroMain = heroImages.main;
const heroSecondary = heroImages.secondary;
const heroScoops = heroImages.scoops;
</script>

<style scoped>
</style>
