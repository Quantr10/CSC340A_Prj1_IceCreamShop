import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Font Awesome Core
import { library } from '@fortawesome/fontawesome-svg-core'

// Solid icons
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

// ✅ BRAND ICONS (these are required for facebook, instagram, twitter)
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

// Vue Font Awesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add all icons you need to the library
library.add(faLocationDot, faPhone, faEnvelope, faFacebookF, faInstagram, faTwitter)

// Create app
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
