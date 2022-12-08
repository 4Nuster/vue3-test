import { createRouter, createWebHistory } from 'vue-router'
import InboxView from '../views/InboxView.vue'
import ArchiveView from '../views/ArchiveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InboxView
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView
    }
  ]
})

export default router
