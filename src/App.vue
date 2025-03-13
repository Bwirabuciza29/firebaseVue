<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="logo">MyApp</div>
      <div class="nav-links">
        <router-link to="/" active-class="active">Home</router-link>
        <router-link to="/feed" active-class="active">Feed</router-link>
        <router-link to="/register" active-class="active">Register</router-link>
        <router-link to="/sign-in" active-class="active" v-if="!isLoggedIn">Login</router-link>
        <button @click="handleSignOut" v-if="isLoggedIn">Déconnexion</button>
      </div>
    </nav>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const router = useRouter()
const isLoggedIn = ref(false)
const auth = getAuth() 

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user
  })
})

const handleSignOut = async () => {
  try {
    await signOut(auth)
    isLoggedIn.value = false
    router.push('/sing-in')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}
</script>

<style scoped>
/* Conteneur principal */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Barre de navigation */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c3e50;
  padding: 12px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Logo */
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

/* Liens de navigation */
.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background 0.3s ease, color 0.3s ease;
}

/* Effet hover */
.nav-links a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Lien actif */
.nav-links .active {
  background: #1abc9c;
  color: white;
}

/* Contenu principal */
.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
