import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
const CropImage = () => import(/* webpackChunkName: "CropImage" */ '@/components/CropImage.vue')

const RemoveBackground = () =>
  import(/* webpackChunkName: "RemoveBackground" */ '@/components/RemoveBackground.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/crop-image',
      name: 'CropImage',
      component: CropImage,
      alias: '/recortar-imagen',
    },
    {
      path: '/remove-background',
      name: 'RemoveBackground',
      component: RemoveBackground,
      alias: '/eliminar-fondo',
    },
    // {
    //   path: '/404/:resource',
    //   name: '404Resource',
    //   component: NotFound,
    //   props: true,
    // },
    // {
    //   path: '/error-de-red',
    //   name: 'NetworkError',
    //   component: NetworkError,
    // },
    // {
    //   path: '/:catchAll(.*)',
    //   name: 'NotFound',
    //   component: NotFound,
    // },
  ],
})

export default router
