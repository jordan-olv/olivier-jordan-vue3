import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/monsters',
      name: 'monsters',
      component: () => import('../views/MonstersView.vue')
    },
    {
      path: '/monster/:monsterId',
      name: 'monster-details',
      component: () => import('../views/MonsterDetail.vue')
    }
  ]
})

export default router
