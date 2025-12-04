import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "vue3-toastify/dist/index.css";

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faStar,
  faArrowRight,
  faArrowUp,
  faChevronDown,
  faChevronUp,faBoxOpen, faClock,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faLocationDot,faBoxOpen, faClock,
  faPhone,
  faEnvelope,
  faFacebookF,
  faInstagram,
  faTwitter,
  faStar,
  faArrowRight,
  faArrowUp,
  faChevronDown,
  faChevronUp,
  faTriangleExclamation
);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
