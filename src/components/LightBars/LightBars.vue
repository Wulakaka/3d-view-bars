<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Experience from './Experience/Experience'

const container = ref()
onMounted(() => {
  const instance = new Experience(container.value)
  instance.resources.ready.then(() => {
    instance.world.updateBars([5, 1, 3, 4, 3, 3, 5, 11])
  })
})
</script>

<template>
  <canvas ref="container" class="h-[320px] w-[380px]" width="380" height="320"></canvas>
</template>

<style scoped></style>
