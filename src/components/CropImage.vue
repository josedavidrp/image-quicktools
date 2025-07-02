<script lang="ts">
import { defineComponent, ref, useTemplateRef } from 'vue'

import { removeBackground } from '@imgly/background-removal'
import { useLoading } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

export default defineComponent({
  name: 'CropImage',
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null)
    const loadingContainer = ref<HTMLInputElement | null>(null)
    const imageFile = ref<File | null>(null)
    const imageUrl = ref<string | null>(null)
    const inProgress = ref(false)
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

    const deleteBg = () => {
      if (!imageFile.value) {
        console.error('No image selected')
        return
      }
      inProgress.value = true
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
          inProgress.value = false
          loader.hide()
        })
        .catch((err) => {
          console.error('Error removing background:', err)
          isFinished.value = true
          inProgress.value = false
          loader.hide()
        })
    }
    const downloadImage = () => {
      if (!imageUrl.value || !imageFile.value) return
      const originalName = imageFile.value.name.replace(/\.[^/.]+$/, '')
      const filename = `${originalName}-processed.png`

      const link = document.createElement('a')
      link.href = imageUrl.value
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    // @ts-ignore
    const _openImage = () => {
      if (imageUrl.value) {
        window.open(imageUrl.value, '_blank')
      }
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
      inProgress,
      downloadImage,
      reset,
    }
  },
})
</script>

<template>
  <div class="card">
    <Button v-if="!imageUrl" @click="triggerFileInput" label="Subir imagen" icon="pi pi-upload" />
    <input
      type="file"
      accept="image/*"
      ref="fileInput"
      @change="handleFileChange"
      style="display: none"
    />
    <div v-if="imageUrl">
      <div class="vl-parent" ref="imageContainer">
        <img :src="imageUrl" alt="Uploaded" style="max-width: 300px" />
      </div>
      <br />
      <Button
        v-if="!isFinished"
        type="button"
        label="Eliminar fondo"
        icon="pi pi-search"
        :loading="inProgress"
        @click="deleteBg"
      />
      <div v-if="isFinished" class="flex gap-3 justify-content-center">
        <Button @click="downloadImage" label="Descargar imagen" icon="pi pi-download" />
        <Button @click="reset" label="Volver a empezar" icon="pi pi-undo" />
      </div>
    </div>
  </div>
  <RouterLink :to="{ name: 'Home' }"><Button label="Atras" severity="contrast" /></RouterLink>
</template>
