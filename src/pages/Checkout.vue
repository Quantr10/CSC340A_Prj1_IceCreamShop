<template>
  <div class="checkout-page">
    <!-- PAGE HEADER -->
    <div class="checkout-header text-center">
      <h1 class="checkout-title">Checkout</h1>
    </div>

    <div class="container py-4">
      <div class="row">
        <!-- LEFT COLUMN — BILLING + PAYMENT FORM -->
        <form class="col-lg-8 pe-lg-5" @submit.prevent="placeOrder">
          <!-- BILLING INFO -->
          <h4 class="fw-bold mb-3">Billing Address:</h4>

          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">First name</label>
              <input
                v-model="form.first"
                class="form-control"
                required
                name="firstName"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">Last name</label>
              <input
                v-model="form.last"
                class="form-control"
                required
                name="lastName"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">Email address</label>
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                required
                name="email"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">State</label>
              <select
                v-model="form.state"
                class="form-select"
                required
                name="state"
              >
                <option disabled value="">Select State</option>
                <option v-for="s in states" :key="s">{{ s }}</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">City</label>
              <select
                v-model="form.city"
                class="form-select"
                required
                name="city"
              >
                <option disabled value="">Select City</option>
                <option v-for="c in cities" :key="c">{{ c }}</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">Zip / postal code</label>
              <input
                v-model="form.zip"
                class="form-control"
                required
                name="zip"
              />
            </div>
          </div>

          <!-- PAYMENT SECTION -->
          <div class="mt-5">
            <h4 class="fw-bold mb-3">Payment Method:</h4>

            <!-- CREDIT CARD OPTION -->
            <div
              class="payment-option p-3 border rounded mb-3"
              :class="{ active: form.payment === 'card' }"
              @click="form.payment = 'card'"
            >
              <div class="d-flex justify-content-between align-items-center">
                <!-- RADIO + TITLE -->
                <div class="d-flex align-items-center gap-2">
                  <span
                    class="custom-radio"
                    :class="{ checked: form.payment === 'card' }"
                  ></span>
                  <strong>Credit card</strong>
                </div>

                <!-- CREDIT CARD ICONS -->
                <div class="d-flex align-items-center gap-1 cc-icons">
                  <font-awesome-icon
                    :icon="['fab', 'cc-visa']"
                    class="cc-icon visa"
                  />
                  <font-awesome-icon
                    :icon="['fab', 'cc-mastercard']"
                    class="cc-icon mastercard"
                  />
                  <font-awesome-icon
                    :icon="['fab', 'cc-amex']"
                    class="cc-icon amex"
                  />
                  <font-awesome-icon
                    :icon="['fab', 'cc-discover']"
                    class="cc-icon discover"
                  />
                </div>
              </div>

              <!-- CARD FORM FIELDS -->
              <div class="row mt-3 g-3" v-if="form.payment === 'card'">
                <!-- CARD NUMBER -->
                <div class="col-12">
                  <label class="form-label">Card number</label>
                  <input
                    v-model="form.card"
                    class="form-control"
                    :required="form.payment === 'card'"
                    name="cardNumber"
                  />
                </div>

                <!-- EXPIRATION MONTH + YEAR -->
                <div class="col-md-6">
                  <label class="form-label">Expiration date</label>
                  <div class="d-flex gap-2">
                    <!-- MONTH -->
                    <select
                      v-model="form.expMonth"
                      class="form-select"
                      :required="form.payment === 'card'"
                      name="expMonth"
                    >
                      <option disabled value="">Month</option>
                      <option v-for="m in 12" :key="m">{{ m }}</option>
                    </select>

                    <!-- YEAR -->
                    <select
                      v-model="form.expYear"
                      class="form-select"
                      :required="form.payment === 'card'"
                      name="expYear"
                    >
                      <option disabled value="">Year</option>
                      <option v-for="y in years" :key="y">{{ y }}</option>
                    </select>
                  </div>
                </div>

                <!-- CVC -->
                <div class="col-md-6">
                  <label class="form-label">Security Code</label>
                  <input
                    v-model="form.cvc"
                    class="form-control"
                    :required="form.payment === 'card'"
                    name="cvc"
                  />
                </div>
              </div>
            </div>

            <!-- CASH -->
            <div
              class="payment-option p-3 border rounded"
              :class="{ active: form.payment === 'cod' }"
              @click="form.payment = 'cod'"
            >
              <div class="d-flex align-items-center gap-2">
                <span
                  class="custom-radio"
                  :class="{ checked: form.payment === 'cod' }"
                ></span>
                <strong>Cash on Delivery</strong>
              </div>
            </div>
          </div>

          <!-- SUBMIT ORDER BUTTON -->
          <button class="place-order-btn w-100 mt-4" type="submit">
            Place Order Now
          </button>
        </form>

        <!-- RIGHT COLUMN — ORDER SUMMARY -->
        <div class="col-lg-4 mt-5 mt-lg-0">
          <div class="order-summary p-4 shadow-sm rounded">
            <h5 class="fw-bold mb-3">Items</h5>

            <!-- ITEM LIST -->
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="order-item pb-3 mb-3 border-bottom"
            >
              <div class="d-flex justify-content-between">
                <strong>{{ item.quantity }} × {{ item.name }}</strong>
                <span class="fw-bold"
                  >${{ (item.price * item.quantity).toFixed(2) }}</span
                >
              </div>

              <p class="small text-muted">{{ itemDesc(item) }}</p>
            </div>

            <!-- GRAND TOTAL -->
            <div class="d-flex justify-content-between mt-3">
              <strong>Grand Total</strong>
              <strong class="text-pink">${{ subtotal.toFixed(2) }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { deleteDoc, collection, getDocs, doc } from "firebase/firestore";
import { db } from "@/firebase";
import "@/assets/Checkout.css";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const cartItems = ref([]);
const form = ref({
  first: "",
  last: "",
  email: "",
  state: "",
  city: "",
  zip: "",
  payment: "card",
  card: "",
  expMonth: "",
  expYear: "",
  cvc: "",
});

const auth = getAuth();
const router = useRouter();

/* LOAD CART WHEN USER LOGS IN */
onAuthStateChanged(auth, async (user) => {
  if (user) loadCart(user.uid);
  else router.push("/cart");
});

/* Fetch cart items from Firestore */
async function loadCart(uid) {
  const snap = await getDocs(collection(db, "users", uid, "cart"));
  cartItems.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* Format item description */
function itemDesc(item) {
  return `${item.size} • ${item.style} • ${item.topping}`;
}

/* Cart subtotal calculation */
const subtotal = computed(() =>
  cartItems.value.reduce((s, i) => s + i.price * i.quantity, 0)
);

/* Select lists */
const states = ["California", "Texas", "Florida", "New York", "Indiana"];
const cities = [
  "Los Angeles",
  "Dallas",
  "Miami",
  "New York City",
  "Indianapolis",
];
const years = Array.from({ length: 12 }, (_, i) => 2024 + i);

/* PLACE ORDER */
async function placeOrder(event) {
  const formEl = event.target.closest("form");

  if (!formEl.checkValidity()) {
    formEl.reportValidity();
    return;
  }

  toast("Order placed successfully!", { autoClose: 3000 });

  const uid = auth.currentUser.uid;
  const snap = await getDocs(collection(db, "users", uid, "cart"));

  await Promise.all(
    snap.docs.map((d) => deleteDoc(doc(db, "users", uid, "cart", d.id)))
  );

  cartItems.value = [];

  setTimeout(() => router.push("/"), 3000);
}
</script>
