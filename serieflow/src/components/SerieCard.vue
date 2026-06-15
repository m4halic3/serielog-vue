<template>
  <article class="card" :class="{ 'card--assistida': serie.assistida }">
    <div class="card-header">
      <span class="card-genero">{{ serie.genero }}</span>
      <span class="card-badge" :class="serie.assistida ? 'badge--sim' : 'badge--nao'">
        {{ serie.assistida ? '✔ Assistida' : '○ Pendente' }}
      </span>
    </div>

    <h2 class="card-titulo">{{ serie.titulo }}</h2>

    <div class="card-meta">
      <span class="card-ano">{{ serie.ano }}</span>
      <span class="card-nota">
        <span class="nota-estrela">★</span>
        {{ serie.nota.toFixed(1) }}
      </span>
    </div>

    <div class="card-acoes">
      <RouterLink :to="`/series/${serie.id}`" class="btn btn-editar">
        Editar
      </RouterLink>
      <button class="btn btn-remover" @click="$emit('remover', serie.id)">
        Remover
      </button>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  serie: {
    type: Object,
    required: true,
  },
})

defineEmits(['remover'])
</script>

<style scoped>
.card {
  background-color: var(--cinza-dark);
  border: 1px solid var(--cinza-borda);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: transform 0.15s, border-color 0.15s;
}

.card:hover {
  transform: translateY(-2px);
  border-color: var(--vinho);
}

.card--assistida {
  border-left: 3px solid var(--vinho);
}

/* ── Header ── */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.card-genero {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--cinza-light);
}

.card-badge {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  border-radius: 20px;
}

.badge--sim {
  background-color: rgba(107, 26, 43, 0.3);
  color: #e57b8c;
  border: 1px solid var(--vinho);
}

.badge--nao {
  background-color: rgba(61, 61, 61, 0.4);
  color: var(--cinza-light);
  border: 1px solid var(--cinza-borda);
}

/* ── Título ── */
.card-titulo {
  font-family: var(--fonte-display);
  font-size: 1.45rem;
  letter-spacing: 1.5px;
  color: var(--branco);
  line-height: 1.2;
}

/* ── Meta ── */
.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-ano {
  font-size: 0.82rem;
  color: var(--cinza-light);
}

.card-nota {
  font-size: 1rem;
  font-weight: 700;
  color: var(--branco-off);
}

.nota-estrela {
  color: var(--vinho-light);
}

/* ── Ações ── */
.card-acoes {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.4rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--cinza-borda);
}

.btn {
  flex: 1;
  padding: 7px 0;
  border: none;
  border-radius: var(--radius);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-align: center;
  transition: background-color 0.15s, color 0.15s;
}

.btn-editar {
  background-color: var(--cinza-mid);
  color: var(--branco-off);
  border: 1px solid var(--cinza-borda);
}

.btn-editar:hover {
  background-color: var(--vinho);
  color: var(--branco);
  border-color: var(--vinho);
}

.btn-remover {
  background-color: transparent;
  color: var(--vermelho);
  border: 1px solid var(--vermelho);
}

.btn-remover:hover {
  background-color: var(--vermelho);
  color: var(--branco);
}
</style>
