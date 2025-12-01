<template>
  <div class="product-detail-page">
    <!-- Header / Title Section with Gradient Background -->
    <div class="product-header text-center">
      <h1 class="display-4 product-detail-title">Product Detail</h1>
    </div>

    <div class="container mb-5">
      <div class="row align-items-start">
        <!-- Left Column: Image -->
        <div class="col-md-6 text-center mb-4 mb-md-0">
          <div class="main-image-wrapper mb-3">
            <img :src="image" :alt="name" class="img-fluid rounded shadow-sm main-img" />
          </div>
          <!-- Small thumbnails would go here if we had multiple images -->
          <div class="d-flex justify-content-center gap-2">
             <div class="thumb-img-wrapper">
               <img :src="image" class="img-fluid rounded" />
             </div>
             <div class="thumb-img-wrapper">
               <img :src="image" class="img-fluid rounded" style="filter: hue-rotate(45deg);" />
             </div>
             <div class="thumb-img-wrapper">
                <img :src="image" class="img-fluid rounded" style="filter: sepia(0.5);" />
             </div>
          </div>
        </div>

        <!-- Right Column: Product Info -->
        <div class="col-md-6">
           <div class="mb-2">
             <div class="d-flex align-items-center gap-1 text-warning small mb-1">
                <font-awesome-icon icon="star" v-for="n in 5" :key="n" :class="n <= Math.round(Number(avgRating)) ? '' : 'text-muted-light'" />
                <span class="text-muted ms-2">({{ avgRating }} / 5)</span>
             </div>
           </div>
           
           <h2 class="product-name mb-2">{{ name }}</h2>
           <h3 class="product-price text-purple fw-bold mb-3">${{ price }}</h3>
           
           <p class="text-muted mb-4">
             Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
           </p>

           <div class="mb-4">
             <span class="fw-bold d-block mb-2">Size:</span>
             <div class="d-flex gap-2">
               <button class="btn btn-outline-secondary rounded-circle size-btn">L</button>
               <button class="btn btn-outline-secondary rounded-circle size-btn">M</button>
               <button class="btn btn-outline-secondary rounded-circle size-btn">S</button>
             </div>
           </div>

           <div class="d-flex align-items-center gap-3 mb-4">
             <div class="quantity-control d-flex align-items-center border rounded">
                <button class="btn btn-light border-0" @click="qty > 1 ? qty-- : null">-</button>
                <span class="px-3">{{ qty }}</span>
                <button class="btn btn-light border-0" @click="qty++">+</button>
             </div>
             <button class="btn btn-pink px-4 py-2" @click="addToCart">Add to Cart</button>
           </div>
           
           <!-- The Requested "Rate This" Button linking to Rating Page -->
            <div class="mb-4">
             <button class="btn btn-outline-purple w-100" @click="goToRating">
               <font-awesome-icon icon="star" class="me-2" />
               Rate This Product
             </button>
           </div>

           <div class="d-flex gap-4 text-muted small mb-4">
             <span><font-awesome-icon :icon="['far', 'heart']" /> Add to wishlist</span>
             <span>Compare</span>
           </div>
           
           <hr />

           <div class="small text-muted mt-4">
             <div class="mb-2">
                <font-awesome-icon icon="truck" class="me-2" /> Free Worldwide Shipping on All Orders Over $250
             </div>
             <div>
                <font-awesome-icon icon="clock" class="me-2" /> Delivers in: 3-7 Working Days <a href="#" class="text-purple">Terms & Conditions</a>
             </div>
           </div>
        </div>
      </div>
      
      <!-- Tabs Section (Description, etc) -->
      <div class="mt-5 pt-5">
        <ul class="nav nav-tabs border-bottom-0 justify-content-center mb-4">
          <li class="nav-item">
            <a 
              class="nav-link border-0" 
              :class="{ active: activeTab === 'description', 'text-purple fw-bold border-bottom': activeTab === 'description', 'text-muted': activeTab !== 'description' }" 
              href="#" 
              @click.prevent="activeTab = 'description'"
            >
              Description
            </a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link border-0"
              :class="{ active: activeTab === 'reviews', 'text-purple fw-bold border-bottom': activeTab === 'reviews', 'text-muted': activeTab !== 'reviews' }" 
              href="#" 
              @click.prevent="activeTab = 'reviews'"
            >
              Reviews ({{ reviews.length }})
            </a>
          </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content text-muted small lh-lg">
          
          <!-- Description Tab -->
          <div v-if="activeTab === 'description'">
             <p>Ratione voluptatem sequi nesciunt neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>
             <p>Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
          </div>

          <!-- Reviews Tab -->
          <div v-if="activeTab === 'reviews'">
            <div v-if="reviews.length === 0" class="text-center py-4">
              <p>No reviews yet. Be the first to review!</p>
              <button class="btn btn-sm btn-outline-purple" @click="goToRating">Write a Review</button>
            </div>
            
            <div v-else class="reviews-list text-start mx-auto" style="max-width: 800px;">
              <div v-for="(review, index) in reviews" :key="index" class="review-item border-bottom py-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="fw-bold text-dark mb-0">{{ review.user }}</h6>
                  <span class="text-muted x-small">{{ formatDate(review.createdAt) }}</span>
                </div>
                <div class="text-warning small mb-2">
                  <font-awesome-icon icon="star" v-for="n in 5" :key="n" :class="n <= review.stars ? '' : 'text-muted-light'" />
                </div>
                <p class="mb-0 text-secondary">{{ review.text }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <!-- Related Products Header -->
      <div class="text-center mt-5 pt-5 mb-4">
        <h2 class="related-title">Related <span class="text-pink">Products</span></h2>
        <p class="text-muted small">Choose from some of related products</p>
      </div>
      
      <!-- Related Products (Reusing Cards) -->
       <div class="row g-4">
        <div class="col-md-4" v-for="item in relatedItems" :key="item.id">
           <IceCreamCard 
            :name="item.name" 
            :price="item.price" 
            :image="item.image" 
            :rating="item.rating"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { menuItems } from '../data/menuItems.js';
import { getRating } from '../utils/ratingService.js';
import IceCreamCard from '../components/IceCreamCard.vue';
import '../assets/ProductDetail.css';

const route = useRoute();
const router = useRouter();
const name = route.params.name;

// Find current item
const item = menuItems.find(i => i.name === name);
const image = ref(route.query.image || item?.image);
const price = ref(route.query.price || item?.price);
const avgRating = ref("0.0");
const reviews = ref([]);
const qty = ref(1);
const activeTab = ref('description');

onMounted(async () => {
  // Fetch full rating data including reviews
  const data = await getRating(name, 0);
  
  // Update average
  if (data.avg !== undefined) {
    avgRating.value = data.avg.toFixed(1);
  }
  
  // Update reviews list
  if (data.reviews && Array.isArray(data.reviews)) {
    // Sort by newest first if createdAt exists, otherwise reverse original order
    reviews.value = data.reviews.reverse(); 
  }
});

// Get 3 random related items
const relatedItems = computed(() => {
  return menuItems.filter(i => i.name !== name).slice(0, 3);
});

function addToCart() {
  alert(`Added ${qty.value} x ${name} to cart!`);
}

function goToRating() {
  router.push({
    name: "Rating",
    params: { name: name },
    query: {
      image: image.value,
      price: price.value
    }
  });
}

function formatDate(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString();
}
</script>
