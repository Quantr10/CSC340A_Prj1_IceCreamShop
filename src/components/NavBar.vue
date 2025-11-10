<template>
  <header class="navbar">
    <div class="navbar-content">
      <router-link to="/" class="logo">Ice Cream Name</router-link>
      <nav>
        <router-link to="/" exact-active-class="active">Home</router-link>
        <router-link to="/menu" exact-active-class="active">Menu</router-link>
        <router-link to="/faq" exact-active-class="active">FAQ</router-link>
        <router-link to="/contact" exact-active-class="active">Contact</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 1000;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo {
    font-family: 'Berkshire Swash', cursive !important;
    font-weight: bold;
    font-size: 1.6rem;
    color: black;
    text-decoration: none;background: transparent;

}

.logo:hover {
  color: hotpink;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  color: black;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
      background: transparent;

}

nav a:hover, nav a:focus {
  color: hotpink;
}

nav a.active {
  color: hotpink;
  border-bottom: 2px solid hotpink;
}
</style>