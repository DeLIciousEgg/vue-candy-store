import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/User/Index/index')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Admin/Login/index')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Admin/Dashboard/index'),
      children: [
        {
          path: '/product',
          name: 'product',
          component: () => import('./views/Admin/Product/index'),
          meta: { requiresAuth: true },
        }
      ]
    }
  ]
})