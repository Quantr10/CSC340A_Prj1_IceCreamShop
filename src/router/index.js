import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Contact from '../pages/Contact.vue'
import Menu from '../pages/Menu.vue'
import Faq from '../pages/Faq.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/menu', name: 'Menu', component: Menu },
  { path: '/faq', name: 'Faq', component: Faq },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
