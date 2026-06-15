import { createRouter, createWebHistory } from 'vue-router'
import ListagemView from '../views/ListagemView.vue'
import NovaSerieView from '../views/NovaSerieView.vue'
import EditarSerieView from '../views/EditarSerieView.vue'

const routes = [
  {

    // Rota aponta para a raiz por que como requisito da atividade, o professor declara que ao abrir a página deve já catalogar na página inicial então a primeira coisa que irá carregar será a listagem de séries do usuário
    path: '/',
    name: 'listagem',
    component: ListagemView,
  },
  {

    // Rota para criar nova série, ao clicar no botão "Adicionar Série" o usuário é redirecionado para essa rota onde irá encontrar um formulário em branco para preencher os dados da nova série
    path: '/series/nova',
    name: 'nova-serie',
    component: NovaSerieView,
  },
  {

    // :id -> é um parâmetro dinâmico que representa o ID da série a ser editada
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
