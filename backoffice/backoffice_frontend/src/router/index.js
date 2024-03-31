import { createRouter, createWebHistory } from 'vue-router'
import Index from "../views/Index.vue"
import CreateAsso from "../views/CreateAsso.vue"
import EditAsso from "../views/EditAsso.vue"
import SingleAsso from "../views/SingleAsso.vue"
import SearchAsso from "../views/SearchAsso.vue"
import CreateEvent from "../views/CreateEvent.vue"
import EditEvent from "../views/EditEvent.vue"
import SingleEvent from "../views/SingleEvent.vue"
import SearchEvent from "../views/SearchEvent.vue"
import AllUsers from "../views/AllUsers.vue"
import EditUser from '../views/EditUser.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/Signup.vue'
import SingleUser from '../views/SingleUser.vue'
import ClosedArchived from '../views/Closed&Archived.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index,
    },
    {
      name: 'CreateAsso',
      path: '/associations/create',
      component: CreateAsso,
    },
    {
      name: 'EditAsso',
      path: '/associations/edit/:id',
      component: EditAsso,
    },
    {
      name: 'SingleAsso',
      path: '/associations/:id',
      component: SingleAsso,
    },
    {
      name: 'SearchAsso',
      path: '/associations/search',
      component: SearchAsso,
    },
    {
      name: 'CreateEvent',
      path: '/events/create',
      component: CreateEvent,
    },
    {
      name: 'EditEvent',
      path: '/events/edit/:id',
      component: EditEvent,
    },
    {
      name: 'SingleEvent',
      path: '/events/:id',
      component: SingleEvent,
    },
    {
      name: 'SearchEvent',
      path: '/events/search',
      component: SearchEvent,
    },
    {
      name: 'AllUsers',
      path: '/users/list',
      component: AllUsers,
    },
    {
      name: 'EditUser',
      path: '/users/edit/:id',
      component: EditUser,
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
    },
    {
      name: 'Signup',
      path: '/signup',
      component: SignUp,
    },
    {
      name: 'SingleUser',
      path: '/users/:id',
      component: SingleUser,
    },
    {
      name: 'Closed&Archived',
      path: '/closed',
      component: ClosedArchived,
    },
  ]
})

export default router