<template>
  <div>
    <h1>Sign In to an Account</h1>
    <div>
      <p><input type="email" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p v-if="errMsg" class="error">{{ errMsg }}</p>
      <p><button @click="register">Submit</button></p>
      <p><button @click="signInWithGoogle">Sign In With Google</button></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup, 
  GoogleAuthProvider,
} from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errMsg = ref('')

const register = async () => {
  if (!email.value || !password.value) {
    errMsg.value = 'Please fill in all fields'
    return
  }

  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value)
    console.log('Successfully signed in!')
    router.push('/feed')
  } catch (error) {
    console.log(error.code)
    switch (error.code) {
      case 'auth/invalid-email':
        errMsg.value = 'Invalid email'
        break
      case 'auth/user-not-found':
        errMsg.value = 'No account with that email was found'
        break
      case 'auth/wrong-password':
        errMsg.value = 'Incorrect password'
        break
      default:
        errMsg.value = 'Email or password was incorrect'
        break
    }
  }
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      const user = result.user
      console.log('Signed in with Google:', user)
      router.push('/feed')
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message)
    })
}
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
