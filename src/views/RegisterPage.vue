<template>
  <div>
    <h1>Créer un compte</h1>
    <div>
      <p><input type="email" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Mot de passe" v-model="password" /></p>
      <p><button @click="register">S'inscrire</button></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const auth = getAuth()

const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Inscription réussie !')
    router.push('/sign-in')
  } catch (error) {
    console.error('Erreur:', error.code)
    alert(error.message)
  }
}
</script>
