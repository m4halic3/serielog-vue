import { createRouter, createWebHistory } from 'vue-router'
import ListagemView from '../views/ListagemView.vue'
import NovaSerieView from '../views/NovaSerieView.vue'
import EditarSerieView from '../views/EditarSerieView.vue'

const routes = [
  {
    path: '/',
    name: 'listagem',
    component: ListagemView,
  },
  {
    path: '/series/nova',
    name: 'nova-serie',
    component: NovaSerieView,
  },
  {
    path: '/series/:id',
    name: 'editar-serie',
    component: EditarSerieView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
