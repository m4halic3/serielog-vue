<template>
  <div class="nova-serie">
    <div class="pagina-header">
      <div>
        <h1 class="pagina-titulo">Nova Série</h1>
        <p class="pagina-subtitulo">Adicione uma série ao seu catálogo</p>
      </div>
      <RouterLink to="/" class="btn-voltar">← Voltar</RouterLink>
    </div>

    <div class="form-container">
      <SerieForm
        texto-botao="Adicionar Série"
        :salvando="salvando"
        @submeter="cadastrarSerie"
        @cancelar="router.push('/')"
      />
    </div>

    <div v-if="sucesso" class="mensagem-sucesso">
      ✔ Série adicionada com sucesso!
    </div>
    <div v-if="erro" class="mensagem-erro">
      Erro ao cadastrar a série. Verifique se a API está rodando.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import SerieForm from '../components/SerieForm.vue'
import { postSerie } from '../services/api.js'

const router = useRouter()
const salvando = ref(false)
const sucesso = ref(false)
const erro = ref(false)

async function cadastrarSerie(dados) {
  salvando.value = true
  sucesso.value = false
  erro.value = false
  try {
    await postSerie(dados)
    sucesso.value = true
    setTimeout(() => router.push('/'), 1200)
  } catch {
    erro.value = true
  } finally {
    salvando.value = false
  }
}
</script>

<style scoped>
.nova-serie {
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
