import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../views/SignIn.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Income from '../views/Income.vue'
import Expense from '../views/Expense.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sign',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: Dashboard 
  },
  {
    path: '/income',
    name: 'Income',
    component: Income
  },
  {
    path: '/expense',
    name: 'Expense',
    component: Expense
  }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
