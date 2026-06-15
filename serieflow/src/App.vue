<template>
  <div id="app-shell">
    <header class="navbar">
      <RouterLink to="/" class="navbar-brand">
        <span class="material-symbols-rounded brand-icon">movie</span>
        <span class="brand-nome">SerieLog</span>
      </RouterLink>
      <nav class="navbar-nav">
        <RouterLink to="/" class="nav-link" active-class="nav-link--ativo">
          Catálogo
        </RouterLink>
        <RouterLink to="/series/nova" class="nav-link nav-link--cta" active-class="nav-link--ativo">
          + Nova Série
        </RouterLink>
      </nav>
    </header>

    <main class="conteudo">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
#app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 60px;
  background-color: var(--cinza-dark);
  border-bottom: 2px solid var(--vinho);
}

@media (max-width: 600px) {
  .navbar {
    height: auto;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  font-size: 28px;
  color: var(--vinho);
}

.brand-nome {
  font-family: var(--fonte-display);
  font-size: 1.5rem;
  letter-spacing: 3px;
  color: var(--branco);
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--cinza-light);
  padding: 6px 0;
  border-bottom: 2px solid transparent;
  text-transform: uppercase;
  transition: all 0.2s;
}

.nav-link:hover,
.nav-link--ativo {
  color: var(--branco);
  border-bottom-color: var(--vinho);
}

.nav-link--cta {
  background-color: var(--vinho);
  color: var(--branco);
  padding: 8px 16px;
  border-radius: var(--radius);
  border-bottom: none;
}

.nav-link--cta:hover {
  background-color: var(--vinho-light);
}

.conteudo {
  flex: 1;
  padding: 2rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .conteudo {
    padding: 1rem;
  }
}
</style>