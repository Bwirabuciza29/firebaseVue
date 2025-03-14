import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FeedPage from '../views/FeedPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import SignIn from '../views/SignIn.vue'
import { getAuth } from 'firebase/auth' // ✅ Import de Firebase Auth

const router = createRouter({
  history: createWebHistory(), // ✅ Retrait de import.meta.env.BASE_URL si non défini
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/feed',
      name: 'FeedPage',
      component: FeedPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage,
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn,
    },
  ],
})

// ✅ Correction de la vérification de l'authentification
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const user = auth.currentUser

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user) {
      next()
    } else {
      alert('Vous devez être connecté pour accéder à cette page.')
      next('/sign-in')
    }
  } else {
    next()
  }
})

export default router
