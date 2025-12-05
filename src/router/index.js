import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Home from "../pages/Home.vue";
import Contact from "../pages/Contact.vue";
import Menu from "../pages/Menu.vue";
import Faq from "../pages/Faq.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import ProductDetail from "../pages/ProductDetail.vue";
import Cart from "../pages/Cart.vue";
import Checkout from "../pages/Checkout.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/menu", name: "Menu", component: Menu },
  { path: "/faq", name: "Faq", component: Faq },
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/product/:name", name: "ProductDetail", component: ProductDetail },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/checkout", name: "Checkout", component: Checkout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// --- IMPORTANT: Wait for Firebase auth to initialize ---
let authResolved = false;

const getUserState = () => {
  return new Promise((resolve) => {
    const auth = getAuth();

    if (authResolved) {
      resolve(auth.currentUser);
      return;
    }

    onAuthStateChanged(auth, (user) => {
      authResolved = true;
      resolve(user);
    });
  });
};

// --- ROUTE GUARD ---
router.beforeEach(async (to, from, next) => {
  const user = await getUserState();
  const isLoggedIn = !!user;

  // Rule 1: Block /checkout for guests
  if (to.path === "/checkout" && !isLoggedIn) {
    return next("/");
  }

  // Rule 2: Block login/signup for logged-in users
  if ((to.path === "/login" || to.path === "/signup") && isLoggedIn) {
    return next("/");
  }

  next();
});

export default router;
