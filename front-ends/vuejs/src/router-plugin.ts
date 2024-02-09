import {
  createRouter,
  createWebHistory,
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: '/',
      path: '/',
      redirect: '/leave-requests',
    },
    {
      name: 'leave-requests',
      path: '/leave-requests',
      component: () => import(
        './pages/LeaveRequests.vue',
      )
    },
    {
      name: 'request-form',
      path: '/request-form',
      component: () => import(
        './pages/RequestForm.vue',
      )
    }
  ],
})

export default router
