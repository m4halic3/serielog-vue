<template>
  <div class="filtro">
    <div class="filtro-grupo">
      <label class="filtro-label" for="filtro-genero">Gênero</label>
      <select
        id="filtro-genero"
        class="filtro-select"
        :value="generoSelecionado"
        @change="$emit('update:generoSelecionado', $event.target.value)"
      >
        <option value="">Todos os gêneros</option>
        <option v-for="genero in generos" :key="genero" :value="genero">
          {{ genero }}
        </option>
      </select>
    </div>

    <div class="filtro-grupo">
      <label class="filtro-label" for="filtro-status">Status</label>
      <select
        id="filtro-status"
        class="filtro-select"
        :value="statusSelecionado"
        @change="$emit('update:statusSelecionado', $event.target.value)"
      >
        <option value="">Todos</option>
        <option value="assistida">Assistidas</option>
        <option value="pendente">Pendentes</option>
      </select>
    </div>

    <button
      v-if="generoSelecionado || statusSelecionado"
      class="filtro-limpar"
      @click="limparFiltros"
    >
      Limpar filtros
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  generos: {
    type: Array,
    required: true,
  },
  generoSelecionado: {
    type: String,
    default: '',
  },
  statusSelecionado: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:generoSelecionado', 'update:statusSelecionado'])

function limparFiltros() {
  emit('update:generoSelecionado', '')
  emit('update:statusSelecionado', '')
}
</script>

<style scoped>
.filtro {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

.filtro-grupo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filtro-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--cinza-light);
}

.filtro-select {
  background-color: var(--cinza-dark);
  border: 1px solid var(--cinza-borda);
  border-radius: var(--radius);
  color: var(--branco);
  padding: 8px 12px;
  font-size: 0.875rem;
  min-width: 180px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B6B6B' stroke-width='2' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.filtro-select:focus {
  outline: none;
  border-color: var(--vinho);
}

.filtro-limpar {
  background: none;
  border: 1px solid var(--cinza-borda);
  border-radius: var(--radius);
  color: var(--cinza-light);
  font-size: 0.8rem;
  padding: 8px 14px;
  transition: color 0.15s, border-color 0.15s;
  margin-bottom: 0;
}

.filtro-limpar:hover {
  color: var(--vermelho);
  border-color: var(--vermelho);
}
</style>
