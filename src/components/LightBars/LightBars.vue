<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Experience from './Experience/Experience'

const container = ref()
onMounted(() => {
  const instance = new Experience(container.value)
})
</script>

<template>
  <canvas ref="container" class="h-[320px] w-[380px]" width="380" height="320"></canvas>
</template>

<style scoped></style>
