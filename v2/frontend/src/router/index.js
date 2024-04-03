import { createRouter, createWebHistory } from 'vue-router'

import Index from "../views/Index.vue"

import Login from '../views/Login.vue'
import SignUp from '../views/Signup.vue'

import AllUsers from "../views/AllUsers.vue"
import EditUser from '../views/EditUser.vue'

import AssociationList from "../views/AssociationList.vue"
import EventList from "../views/EventList.vue"

import ClosedArchived from '../views/Closed&Archived.vue'

import CreateAsso from "../views/CreateAsso.vue"
import CreateEvent from "../views/CreateEvent.vue"

import EditAsso from "../views/EditAsso.vue"
import EditEvent from "../views/EditEvent.vue"

import SearchAsso from "../views/SearchAsso.vue"
import SearchEvent from "../views/SearchEvent.vue"

import SingleUser from '../views/SingleUser.vue'
import SingleAsso from "../views/SingleAsso.vue"
import SingleEvent from "../views/SingleEvent.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index,
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
      name: 'AssociationsList',
      path: '/associations',
      component: AssociationList,
    },
    {
      name: 'EventsList',
      path: '/events',
      component: EventList,
    },
    {
      name: 'Closed&Archived',
      path: '/closed',
      component: ClosedArchived,
    },
    {
      name: 'CreateAsso',
      path: '/associations/create',
      component: CreateAsso,
    },
    {
      name: 'CreateEvent',
      path: '/events/create',
      component: CreateEvent,
    },
    {
      name: 'EditAsso',
      path: '/associations/edit/:id',
      component: EditAsso,
    },
    {
      name: 'EditEvent',
      path: '/events/edit/:id',
      component: EditEvent,
    },
    {
      name: 'SearchAsso',
      path: '/associations/search',
      component: SearchAsso,
    },
    {
      name: 'SearchEvent',
      path: '/events/search',
      component: SearchEvent,
    },
    {
      name: 'SingleUser',
      path: '/users/:id',
      component: SingleUser,
    },
    {
      name: 'SingleAsso',
      path: '/associations/:id',
      component: SingleAsso,
    },
    {
      name: 'SingleEvent',
      path: '/events/:id',
      component: SingleEvent,
    },
  ]
})

export default router