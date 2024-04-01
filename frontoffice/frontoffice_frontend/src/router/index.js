import { createRouter, createWebHistory } from 'vue-router'
import Index from "../views/Index.vue"
import SingleAsso from "../views/SingleAsso.vue"
import AssociationList from "../views/AssociationList.vue"
import SingleEvent from "../views/SingleEvent.vue"
import EventList from "../views/EventList.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index,
    },
    {
      name: 'SingleAsso',
      path: '/associations/:id',
      component: SingleAsso,
    },
    {
      name: 'AssociationsList',
      path: '/associations',
      component: AssociationList,
    },
    {
      name: 'SingleEvent',
      path: '/events/:id',
      component: SingleEvent,
    },
    {
      name: 'EventsList',
      path: '/events',
      component: EventList,
    },
  ]
})

export default router