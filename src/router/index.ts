import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/products',
    },
    {
      path: '/products',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'ProductsPage',
          component: () => import('pages/ProductsPage.vue'),
        },
        {
          path: ':productId',
          name: 'ProductPageDetails',
          component: () => import('pages/ProductPageDetails.vue'),
        },
      ],
    },

    {
      path: '/:catchAll(.*)*',
      name: 'ErrorPage',
      component: () => import('pages/ErrorNotFound.vue'),
    },
  ],
})

export default router
