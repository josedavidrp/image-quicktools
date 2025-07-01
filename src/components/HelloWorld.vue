<script lang="ts">
import { defineComponent, ref, useTemplateRef } from 'vue'
import { removeBackground } from '@imgly/background-removal'
import { useLoading } from 'vue-loading-overlay'
export default defineComponent({
  name: 'ImageBackgroundRemover',
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null)
    const imageFile = ref<File | null>(null)
    const imageUrl = ref<string | null>(null)
    const isLoading = ref(false)
    const imageContainer = useTemplateRef('imageContainer')
    const triggerFileInput = () => {
      fileInput.value?.click()
    }

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      const file = target.files?.[0]
      if (file && file.type.startsWith('image/')) {
        imageFile.value = file
        imageUrl.value = URL.createObjectURL(file)
      }
    }
    const debugLoad = () => {
      const $loading = useLoading({
        isFullPage: false,
        container: imageContainer.value as HTMLElement,
      })
      console.log(imageContainer.value)
      const loader = $loading.show({})
      // simulate AJAX
      setTimeout(() => {
        //loader.hide()
      }, 5000)
    }
    const deleteBg = () => {
      if (!imageFile.value) {
        console.error('No image selected')
        return
      }

      isLoading.value = true

      removeBackground(imageFile.value)
        .then((blob: Blob) => {
          const url = URL.createObjectURL(blob)
          console.log('Background removed image:', url)
          imageUrl.value = url
          isLoading.value = true
        })
        .catch((err) => {
          console.error('Error removing background:', err)
          isLoading.value = true
        })
    }

    return {
      fileInput,
      imageFile,
      imageUrl,
      triggerFileInput,
      handleFileChange,
      deleteBg,
      isLoading,
      debugLoad,
    }
  },
})
</script>

<template>
  <div class="card">
    <button @click="triggerFileInput">Subir imagen</button>
    <input
      type="file"
      accept="image/*"
      ref="fileInput"
      @change="handleFileChange"
      style="display: none"
    />
    <div v-if="imageUrl">
      <p>Preview:</p>
      <div class="vl-parent" ref="imageContainer">
        <img :src="imageUrl" alt="Uploaded" style="max-width: 300px" />
      </div>
      <br />
      <button @click="debugLoad">Eliminar fondo</button>
    </div>
  </div>

  <p>
    Creado por
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">Jose David Rodriguez</a
    >, utilizando <a href="" target="_blank">@imgly/background-removal</a>
  </p>
</template>
