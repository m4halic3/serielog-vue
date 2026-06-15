<template>
  <div class="listagem">
    <!-- Cabeçalho da página -->
    <div class="pagina-header">
      <div>
        <h1 class="pagina-titulo">Meu Catálogo</h1>
        <p class="pagina-subtitulo">
          {{ series.length }} série{{ series.length !== 1 ? 's' : '' }} registrada{{ series.length !== 1 ? 's' : '' }}
        </p>
      </div>
    </div>

    <!-- Mensagem de erro de conexão -->
    <div v-if="erro" class="mensagem-erro">
      <strong>Não foi possível conectar à API.</strong>
      Verifique se o JSON Server está rodando em <code>http://localhost:3000</code>.
    </div>

    <!-- Filtros -->
    <section v-if="!carregando && !erro" class="secao-filtros">
      <FiltroSeries
        :generos="generosUnicos"
        v-model:generoSelecionado="filtroGenero"
        v-model:statusSelecionado="filtroStatus"
      />
      <span class="filtro-contagem">
        {{ seriesFiltradas.length }} resultado{{ seriesFiltradas.length !== 1 ? 's' : '' }}
      </span>
    </section>

    <!-- Loading -->
    <div v-if="carregando" class="estado-vazio">
      <span class="spinner"></span>
      <p>Carregando catálogo...</p>
    </div>

    <!-- Lista de cards -->
    <TransitionGroup
      v-else-if="seriesFiltradas.length > 0"
      name="lista"
      tag="div"
      class="grade-series"
    >
      <SerieCard
        v-for="serie in seriesFiltradas"
        :key="serie.id"
        :serie="serie"
        @remover="removerSerie"
      />
    </TransitionGroup>

    <!-- Estado vazio -->
    <div v-else-if="!erro" class="estado-vazio">
      <span class="vazio-icone">📺</span>
      <p v-if="filtroGenero || filtroStatus">
        Nenhuma série encontrada com os filtros selecionados.
      </p>
      <p v-else>
        Seu catálogo está vazio.
        <RouterLink to="/series/nova" class="link-acao">Adicione sua primeira série.</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import SerieCard from '../components/SerieCard.vue'
import FiltroSeries from '../components/FiltroSeries.vue'
import { getSeries, deleteSerie } from '../services/api.js'

const series = ref([])
const carregando = ref(true)
const erro = ref(false)

const filtroGenero = ref('')
const filtroStatus = ref('')

// ── Computed: gêneros únicos para o select
const generosUnicos = computed(() => {
  const set = new Set(series.value.map((s) => s.genero))
  return [...set].sort()
})

// ── Computed: lista filtrada (sem nova requisição à API)
const seriesFiltradas = computed(() => {
  return series.value.filter((s) => {
    const passaGenero = !filtroGenero.value || s.genero === filtroGenero.value
    const passaStatus =
      !filtroStatus.value ||
      (filtroStatus.value === 'assistida' && s.assistida) ||
      (filtroStatus.value === 'pendente' && !s.assistida)
    return passaGenero && passaStatus
  })
})

// ── Carrega séries ao montar
onMounted(async () => {
  try {
    series.value = await getSeries()
  } catch {
    erro.value = true
  } finally {
    carregando.value = false
  }
})

// ── Remove série
async function removerSerie(id) {
  if (!confirm('Remover esta série do catálogo?')) return
  try {
    await deleteSerie(id)
    series.value = series.value.filter((s) => s.id !== id)
  } catch {
    alert('Erro ao remover a série. Tente novamente.')
  }
}
</script>

<style scoped>
.listagem {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* ── Cabeçalho ── */
.pagina-header {
  display: flex;
  align-items: flex-end;
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

/* ── Erro ── */
.mensagem-erro {
  background-color: rgba(192, 57, 43, 0.15);
  border: 1px solid var(--vermelho);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  color: #e88;
  font-size: 0.875rem;
  line-height: 1.6;
}

.mensagem-erro code {
  background: rgba(0,0,0,0.3);
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 0.85em;
}

/* ── Filtros ── */
.secao-filtros {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.filtro-contagem {
  font-size: 0.78rem;
  color: var(--cinza-light);
  white-space: nowrap;
}

/* ── Grade ── */
.grade-series {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

/* ── Estado vazio / loading ── */
.estado-vazio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 1rem;
  color: var(--cinza-light);
  font-size: 0.9rem;
  text-align: center;
}

.vazio-icone {
  font-size: 2.5rem;
  filter: grayscale(1);
  opacity: 0.5;
}

.link-acao {
  color: var(--vinho-light);
  font-weight: 600;
  text-decoration: underline;
}

/* ── Spinner ── */
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

/* ── Transição da lista ── */
.lista-enter-active,
.lista-leave-active {
  transition: all 0.25s ease;
}

.lista-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.lista-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
