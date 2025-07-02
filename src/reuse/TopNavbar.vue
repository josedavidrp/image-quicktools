<script lang="ts">
import { defineComponent } from 'vue'
import Menubar from 'primevue/menubar'

export default defineComponent({
  name: 'TopNavbar',
  components: {
    Menubar,
  },
  setup() {
    const openLinkedIn = () => {
      window.open('https://www.linkedin.com/in/jdavid-rodriguez/', '_blank')
    }
    return {
      openLinkedIn,
    }
  },
})
</script>

<template>
  <header class="flex justify-content-between align-items-center px-4 py-2 surface-100 shadow-2">
    <!-- Left: App name -->
    <RouterLink :to="{ name: 'Home' }">
      <div class="font-bold text-xl">Image Quicktools</div>
    </RouterLink>

    <!-- Center: Placeholder buttons -->
    <div class="flex gap-2">
      <Button label="Btn 1" text />
      <Button label="Btn 2" text />
      <Button label="Btn 3" text />
    </div>

    <!-- Right: LinkedIn button -->
    <Button
      label="LinkedIn"
      icon="pi pi-linkedin"
      class="p-button-sm p-button-outlined"
      @click="openLinkedIn"
    />
  </header>
</template>
