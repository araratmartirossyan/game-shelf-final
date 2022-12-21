import { createWebHistory, createRouter } from 'vue-router'

const history = createWebHistory()

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/Home/Home.vue')
  },
  {
    path: '/game-form-create/',
    name: 'game-form-create',
    component: () => import('./views/GameForm/GameForm.vue')
  },
  {
    path: '/game-detail/:id',
    name: 'game-detail',
    component: () => import('./views/GameDetail/GameDetail.vue')
  }
]

const router = createRouter({ history, routes })

export default router
