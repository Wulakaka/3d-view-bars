<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Experience from './Experience/Experience'

const canvas = ref()

let experience: Experience

onMounted(() => {
  experience = new Experience(canvas.value)
})

onBeforeUnmount(() => {
  experience.destroy()
})
</script>

<template>
  <canvas class="w-[600px] h-[600px]" width="600" height="600" ref="canvas"></canvas>
</template>

<style scoped></style>
