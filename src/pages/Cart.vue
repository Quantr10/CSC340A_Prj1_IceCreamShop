<template>
  <div class="cart-page">
    <!-- PAGE TITLE -->
    <div class="cart-header text-center">
      <h1 class="cart-title">Cart</h1>
    </div>

    <div class="container py-4">

      <!-- EMPTY CART MESSAGE -->
      <div v-if="cartItems.length === 0" class="empty-cart text-center py-5">
        <h3 class="text-muted">Your cart is empty 🛒</h3>
      </div>

      <!-- CART CONTENT WHEN THERE ARE ITEMS -->
      <div v-else class="cart-wrapper">

        <!-- CART ITEMS SECTION -->
        <div>

          <!-- CART COLUMN HEADERS -->
          <div class="cart-header-row row text-muted p-3">
            <div class="col-lg-6 col-md-6 col-6">Product</div>
            <div class="col-lg-1 col-md-2 col-2 text-center">Price</div>
            <div class="col-lg-2 col-md-2 col-2 text-center">Quantity</div>
            <div class="col-lg-2 col-md-2 col-2 text-center">Total</div>
            <div class="col-lg-1 col-md-2 col-2 text-center"></div>
          </div>

          <hr class="mt-0 mb-3" />

          <!-- LIST OF CART ITEMS -->
          <div class="cart-items">
            <div
              class="cart-item shadow-sm p-3 mb-3 rounded"
              v-for="item in cartItems"
              :key="item.id"
            >
              <div class="row align-items-center">

                <!-- PRODUCT IMAGE -->
                <div class="col-lg-2 col-md-3 col-4">
                  <img :src="getImageUrl(item.image)" class="cart-img" />
                </div>

                <!-- PRODUCT DETAILS -->
                <div class="col-lg-4 col-md-6 col-8">
                  <h6 class="fw-bold mb-1">{{ item.name }}</h6>
                  <div class="text-muted small">
                    <div>Size: <strong>{{ item.size }}</strong></div>
                    <div>Style: <strong>{{ item.style }}</strong></div>
                    <div>Topping: <strong>{{ item.topping }}</strong></div>
                  </div>
                </div>

                <!-- UNIT PRICE -->
                <div class="col-lg-1 col-md-3 col-12 mt-3 mt-lg-0 d-flex justify-content-center">
                  <h6 class="fw-bold item-price">${{ item.price }}</h6>
                </div>

                <!-- QUANTITY CONTROLS -->
                <div class="col-lg-2 col-md-4 col-12 mt-3 mt-md-0 d-flex justify-content-center">
                  <div class="quantity-control d-flex align-items-center border rounded">
                    <button class="btn btn-light border-0"
                      @click="updateQty(item, item.quantity > 1 ? item.quantity - 1 : 1)">
                      -
                    </button>

                    <span class="px-3">{{ item.quantity }}</span>

                    <button class="btn btn-light border-0"
                      @click="updateQty(item, item.quantity + 1)">
                      +
                    </button>
                  </div>
                </div>

                <!-- TOTAL PRICE FOR THIS ITEM -->
                <div class="col-lg-2 col-md-4 col-6 mt-3 mt-lg-0 d-flex justify-content-center">
                  <h6 class="fw-bold">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </h6>
                </div>

                <!-- REMOVE ITEM BUTTON -->
                <div class="col-lg-1 col-md-4 col-6 mt-3 mt-lg-0 d-flex justify-content-center">
                  <button class="delete-btn trash-btn" @click="removeItem(item.id)">
                    <font-awesome-icon :icon="['fas', 'trash']" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- SIDE SUMMARY PANEL -->
        <div class="cart-summary shadow-sm p-4 rounded">

          <h4 class="fw-bold mb-3">Order Summary</h4>

          <!-- Subtotal -->
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Subtotal</span>
            <span class="fw-bold">${{ subtotal.toFixed(2) }}</span>
          </div>

          <!-- Shipping is static FREE -->
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Shipping</span>
            <span class="fw-bold text-success">FREE</span>
          </div>

          <hr class="my-3" />

          <!-- Grand Total -->
          <div class="d-flex justify-content-between mb-4 fs-5">
            <span class="fw-bold">Total</span>
            <span class="fw-bold">${{ subtotal.toFixed(2) }}</span>
          </div>

          <!-- CHECKOUT BUTTON -->
          <button class="checkout-btn" @click="handleCheckout">
            Check Out
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { db } from "@/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import "../assets/Cart.css";
import { toast } from "vue3-toastify";

/* -----------------------------
  INITIAL SETUP
----------------------------- */
const router = useRouter();
const auth = getAuth();
const cartItems = ref([]);

/* -----------------------------
  Convert image filename → actual URL
----------------------------- */
function getImageUrl(filename) {
  return new URL(`../images/${filename}`, import.meta.url).href;
}

/* -----------------------------
  Load cart
----------------------------- */
async function fetchCart() {
  const user = auth.currentUser;

  if (user) {
    const snapshot = await getDocs(collection(db, "users", user.uid, "cart"));
    cartItems.value = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
  } else {
    cartItems.value = JSON.parse(localStorage.getItem("cart")) || [];
  }
}

/* -----------------------------
  Update item quantity
----------------------------- */
async function updateQty(item, newQty) {
  const user = auth.currentUser;

  if (newQty <= 0) return removeItem(item.id);

  if (user) {
    const docRef = doc(db, "users", user.uid, "cart", item.id);
    await updateDoc(docRef, { quantity: newQty });
    item.quantity = newQty;
  } else {
    let localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = localCart.find(i => i.id === item.id);
    found.quantity = newQty;
    localStorage.setItem("cart", JSON.stringify(localCart));
    item.quantity = newQty;
  }
}

/* -----------------------------
  Remove item from cart
----------------------------- */
async function removeItem(id) {
  const user = auth.currentUser;

  if (user) {
    await deleteDoc(doc(db, "users", user.uid, "cart", id));
    cartItems.value = cartItems.value.filter(i => i.id !== id);
  } else {
    let localCart = JSON.parse(localStorage.getItem("cart")) || [];
    localCart = localCart.filter(i => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(localCart));
    cartItems.value = localCart;
  }
}

/* -----------------------------
  Handle Checkout
----------------------------- */
async function handleCheckout() {
  const user = auth.currentUser;

  if (user) {
    router.push("/checkout");
  } else {
    localStorage.setItem("redirectAfterLogin", "cart");
    toast("Please log in or sign up to continue checkout");
    setTimeout(() => router.push("/login"), 5000);
  }
}

/* -----------------------------
  Calculate subtotal of cart
----------------------------- */
const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

/* -----------------------------
  Load cart on mount
----------------------------- */
onMounted(fetchCart);
</script>
