<script lang="ts">
import { defineComponent, ref, useTemplateRef } from 'vue'
import { removeBackground } from '@imgly/background-removal'
import { useLoading } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
export default defineComponent({
  name: 'ImageBackgroundRemover',
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null)
    const loadingContainer = ref<HTMLInputElement | null>(null)
    const imageFile = ref<File | null>(null)
    const imageUrl = ref<string | null>(null)
    const isFinished = ref(false)
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    const loaderBgColor = isDarkMode ? '#242424' : '#fff'
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
        container: loadingContainer,
        backgroundColor: loaderBgColor,
      })
      console.log(imageContainer.value)
      const loader = $loading.show()
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

      const $loading = useLoading({
        isFullPage: false,
        container: imageContainer.value as HTMLElement,
        backgroundColor: loaderBgColor,
      })
      const loader = $loading.show()

      removeBackground(imageFile.value)
        .then((blob: Blob) => {
          const url = URL.createObjectURL(blob)
          console.log('Background removed image:', url)
          imageUrl.value = url
          isFinished.value = true
          loader.hide()
        })
        .catch((err) => {
          console.error('Error removing background:', err)
          isFinished.value = true
          loader.hide()
        })
    }

    const reset = () => {
      imageUrl.value = null
      imageFile.value = null
      isFinished.value = false
      if (fileInput.value) fileInput.value.value = ''
    }

    return {
      fileInput,
      loadingContainer,
      imageFile,
      imageUrl,
      triggerFileInput,
      handleFileChange,
      deleteBg,
      isFinished,
      reset,
    }
  },
})
</script>

<template>
  <div class="card">
    <button v-if="!imageUrl" @click="triggerFileInput">Subir imagen</button>
    <input
      type="file"
      accept="image/*"
      ref="fileInput"
      @change="handleFileChange"
      style="display: none"
    />
    <div v-if="imageUrl">
      <div class="vl-parent" ref="loadingContainer">
        <img :src="imageUrl" alt="Uploaded" style="max-width: 300px" />
      </div>
      <br />
      <button v-if="!isFinished" @click="deleteBg">Eliminar fondo</button>
      <div v-if="isFinished">
        <button @click="reset">Descargar imagen</button>
        <button @click="reset">Volver a empezar</button>
      </div>
    </div>
  </div>

  <p>
    Creado por
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">Jose David Rodriguez</a
    >, utilizando <a href="" target="_blank">@imgly/background-removal</a>
  </p>
</template>
