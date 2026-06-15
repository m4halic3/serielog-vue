<template>
  <div class="editar-serie">
    <div class="pagina-header">
      <div>
        <h1 class="pagina-titulo">Editar Série</h1>
        <p class="pagina-subtitulo" v-if="serie">{{ serie.titulo }}</p>
      </div>
      <RouterLink to="/" class="btn-voltar">← Voltar</RouterLink>
    </div>

    <div v-if="carregando" class="estado-vazio">
      <span class="spinner"></span>
      <p>Carregando dados...</p>
    </div>

    <div v-else-if="erroCarregar" class="mensagem-erro">
      Série não encontrada ou API indisponível.
    </div>

    <div v-else class="form-container">
      <SerieForm
        :dados-iniciais="dadosForm"
        texto-botao="Salvar Alterações"
        :salvando="salvando"
        @submeter="atualizarSerie"
        @cancelar="router.push('/')"
      />
    </div>

    <div v-if="sucesso" class="mensagem-sucesso">
      ✔ Série atualizada com sucesso!
    </div>
    <div v-if="erroSalvar" class="mensagem-erro">
      Erro ao salvar. Verifique se a API está rodando.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import SerieForm from '../components/SerieForm.vue'
import { getSerieById, putSerie } from '../services/api.js'

const route = useRoute()
const router = useRouter()

const serie = ref(null)
const dadosForm = ref({})
const carregando = ref(true)
const salvando = ref(false)
const sucesso = ref(false)
const erroCarregar = ref(false)
const erroSalvar = ref(false)

onMounted(async () => {
  try {
    serie.value = await getSerieById(route.params.id)
    dadosForm.value = { ...serie.value }
  } catch {
    erroCarregar.value = true
  } finally {
    carregando.value = false
  }
})

async function atualizarSerie(dados) {
  salvando.value = true
  sucesso.value = false
  erroSalvar.value = false
  try {
    await putSerie(route.params.id, dados)
    sucesso.value = true
    setTimeout(() => router.push('/'), 1200)
  } catch {
    erroSalvar.value = true
  } finally {
    salvando.value = false
  }
}
</script>

<style scoped>
.editar-serie {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.pagina-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--cinza-borda);
}

.pagina-titulo {
  font-family: var(--fonte-display);
  font-size: 2.5rem;
  letter-spacing: 3px;
  color: var(--branco);
  line-height: 1;
}

.pagina-subtitulo {
  font-size: 0.8rem;
  color: var(--cinza-light);
  margin-top: 4px;
}

.btn-voltar {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--cinza-light);
  border: 1px solid var(--cinza-borda);
  border-radius: var(--radius);
  padding: 7px 14px;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;
}

.btn-voltar:hover {
  color: var(--branco);
  border-color: var(--branco-off);
}

.form-container {
  background-color: var(--cinza-dark);
  border: 1px solid var(--cinza-borda);
  border-radius: var(--radius);
  padding: 1.75rem;
  max-width: 640px;
}

.estado-vazio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 1rem;
  color: var(--cinza-light);
  font-size: 0.9rem;
}

.spinner {
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 3px solid var(--cinza-borda);
  border-top-color: var(--vinho);
  border-radius: 50%;
  animation: girar 0.7s linear infinite;
}

@keyframes girar {
  to { transform: rotate(360deg); }
}

.mensagem-sucesso {
  background-color: rgba(107, 26, 43, 0.2);
  border: 1px solid var(--vinho);
  border-radius: var(--radius);
  padding: 0.9rem 1.25rem;
  color: #e57b8c;
  font-size: 0.875rem;
  font-weight: 600;
  max-width: 640px;
}

.mensagem-erro {
  background-color: rgba(192, 57, 43, 0.15);
  border: 1px solid var(--vermelho);
  border-radius: var(--radius);
  padding: 0.9rem 1.25rem;
  color: #e88;
  font-size: 0.875rem;
  max-width: 640px;
}
</style>
