<template>
  <div>
    <h1>Create an Account</h1>
    <div>
      <p><input type="email" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><button @click="register">Submit</button></p>
      <p><button @click="signInWithGoogle">Sign In With Google</button></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter() // Corrected from useRoute() to useRouter()
const email = ref('')
const password = ref('')

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Successfully registered!')
      router.push('/feed') // Redirect to the feed page after successful registration
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message)
    })
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      const user = result.user
      console.log('Signed in with Google:', user)
      router.push('/feed') // Redirect to the feed page after successful Google sign-in
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message)
    })
}
</script>


