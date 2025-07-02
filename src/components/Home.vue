<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Card from 'primevue/card'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    Card,
  },
  setup() {
    const tools = [
      {
        title: 'Recortar imagen',
        icon: 'pi pi-hashtag',
        bgColor: '#4CAF50',
        route: 'CropImage',
      },
      {
        title: 'Elminar fondo',
        icon: 'pi pi-arrows-alt',
        bgColor: '#2196F3',
        route: 'RemoveBackground',
      },
      {
        title: 'Crop Image',
        icon: 'pi pi-hashtag',
        bgColor: '#4CAF50',
        route: 'CropImage',
      },
      {
        title: 'Resize Image',
        icon: 'pi pi-arrows-alt',
        bgColor: '#2196F3',
        route: 'RemoveBackground',
      },
      // Add more tools as needed
    ]

    return {
      tools,
    }
  },
})
</script>

<template>
  <div class="flex justify-content-center">
    <div class="grid p-3 col-10">
      <RouterLink
        v-for="tool in tools"
        :key="tool.title"
        :to="{ name: tool.route }"
        class="col-12 md:col-4 lg:col-3 p-2 text-white no-underline"
      >
        <div
          class="p-4 border-round shadow-2 flex flex-column align-items-center justify-content-center h-full transition-colors transition-duration-200 hover:shadow-5"
          :style="{ backgroundColor: tool.bgColor }"
        >
          <i :class="tool.icon" class="text-4xl mb-3"></i>
          <h3 class="m-0">{{ tool.title }}</h3>
        </div>
      </RouterLink>
    </div>
  </div>
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
