import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// My web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAIJwwxfjDh2SkmdBaAzuE8K-oKZrv1pFY',
  authDomain: 'exercice-753ee.firebaseapp.com',
  projectId: 'exercice-753ee',
  storageBucket: 'exercice-753ee.firebasestorage.app',
  messagingSenderId: '455910631629',
  appId: '1:455910631629:web:3365e23055b11cde7d6184',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const app = createApp(App)

app.use(router)

app.mount('#app')
