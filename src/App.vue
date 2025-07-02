<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TopNavbar from './reuse/TopNavbar.vue'
</script>

<template>
  <TopNavbar />
  <HelloWorld />
  <p>
    Creado por
    <a href="https://www.linkedin.com/in/jdavid-rodriguez/" target="_blank">Jose David Rodriguez</a
    >, utilizando
    <a
      href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.npmjs.com/package/%40imgly/background-removal&ved=2ahUKEwiKlYq44Z6OAxX0BNsEHUNAMAgQFnoECAoQAQ&usg=AOvVaw1cee2nQK6f8u_UWeLMh72s"
      target="_blank"
      >@imgly/background-removal</a
    >
  </p>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
