<template>
  <form class="serie-form" @submit.prevent="submeter">
    <div class="form-row">
      <div class="form-grupo">
        <label class="form-label" for="titulo">Título *</label>
        <input
          id="titulo"
          v-model="form.titulo"
          type="text"
          class="form-input"
          placeholder="Ex: Breaking Bad"
          required
        />
      </div>

      <div class="form-grupo">
        <label class="form-label" for="ano">Ano *</label>
        <input
          id="ano"
          v-model.number="form.ano"
          type="number"
          class="form-input"
          placeholder="Ex: 2008"
          min="1900"
          :max="anoAtual"
          required
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-grupo">
        <label class="form-label" for="genero">Gênero *</label>
        <input
          id="genero"
          v-model="form.genero"
          type="text"
          class="form-input"
          placeholder="Ex: Crime / Drama"
          required
        />
      </div>

      <div class="form-grupo">
        <label class="form-label" for="nota">Nota (0–10) *</label>
        <input
          id="nota"
          v-model.number="form.nota"
          type="number"
          class="form-input"
          placeholder="Ex: 9.5"
          min="0"
          max="10"
          step="0.1"
          required
        />
      </div>
    </div>

    <div class="form-grupo form-grupo--check">
      <label class="form-check">
        <input
          v-model="form.assistida"
          type="checkbox"
          class="check-input"
        />
        <span class="check-label">Já assisti esta série</span>
      </label>
    </div>

    <div class="form-acoes">
      <button type="button" class="btn-cancelar" @click="$emit('cancelar')">
        Cancelar
      </button>
      <button type="submit" class="btn-salvar" :disabled="salvando">
        {{ salvando ? 'Salvando...' : textoBotao }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  dadosIniciais: {
    type: Object,
    default: () => ({
      titulo: '',
      genero: '',
      nota: '',
      ano: '',
      assistida: false,
    }),
  },
  textoBotao: {
    type: String,
    default: 'Salvar',
  },
  salvando: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submeter', 'cancelar'])

const anoAtual = new Date().getFullYear()

const form = ref({ ...props.dadosIniciais })

watch(
  () => props.dadosIniciais,
  (novos) => {
    form.value = { ...novos }
  },
  { deep: true }
)

function submeter() {
  emit('submeter', { ...form.value })
}
</script>

<style scoped>
.serie-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-grupo {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-grupo--check {
  margin-top: 0.25rem;
}

.form-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: var(--cinza-light);
}

.form-input {
  background-color: var(--cinza-dark);
  border: 1px solid var(--cinza-borda);
  border-radius: var(--radius);
  color: var(--branco);
  padding: 10px 12px;
  font-size: 0.9rem;
  transition: border-color 0.15s;
}

.form-input:focus {
  outline: none;
  border-color: var(--vinho);
}

.form-input::placeholder {
  color: var(--cinza-light);
}

/* ── Checkbox ── */
.form-check {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.check-input {
  width: 17px;
  height: 17px;
  accent-color: var(--vinho);
  cursor: pointer;
}

.check-label {
  font-size: 0.875rem;
  color: var(--branco-off);
}

/* ── Ações ── */
.form-acoes {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--cinza-borda);
}

.btn-cancelar {
  background: none;
  border: 1px solid var(--cinza-borda);
  border-radius: var(--radius);
  color: var(--cinza-light);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 10px 20px;
  transition: color 0.15s, border-color 0.15s;
}

.btn-cancelar:hover {
  color: var(--branco);
  border-color: var(--branco-off);
}

.btn-salvar {
  background-color: var(--vinho);
  border: none;
  border-radius: var(--radius);
  color: var(--branco);
  font-size: 0.875rem;
  font-weight: 700;
  padding: 10px 28px;
  letter-spacing: 0.4px;
  transition: background-color 0.15s;
}

.btn-salvar:hover:not(:disabled) {
  background-color: var(--vinho-light);
}

.btn-salvar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 560px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
