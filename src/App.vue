<script lang="ts">
import TopNavbar from './reuse/TopNavbar.vue'
import Card from 'primevue/card'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImageQuicktools',
  components: {
    TopNavbar,
    Card,
  },
  setup() {},
})
</script>

<template>
  <div class="layout">
    <TopNavbar />

    <main class="router-view">
      <RouterView />
    </main>

    <footer class="footer">
      <p>
        Creado por
        <a href="https://www.linkedin.com/in/jdavid-rodriguez/" target="_blank">
          Jose David Rodriguez </a
        >, utilizando
        <a href="https://www.npmjs.com/package/@imgly/background-removal" target="_blank">
          @imgly/background-removal
        </a>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.router-view {
  flex: 1;
}

.footer {
  text-align: center;
  padding: 1rem;
  background: var(--surface-100); /* opcional si usas PrimeVue */
  font-size: 0.85rem;
}
</style>
