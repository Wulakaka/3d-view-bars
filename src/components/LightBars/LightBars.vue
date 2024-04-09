<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import * as d3 from 'd3'
import Experience from './Experience/Experience'

const container = ref()

const scale = d3.scaleLinear().range([0, 10])

const list = ref(Array.from({ length: 8 }, () => Math.round(Math.random() * 10)))

setInterval(() => {
  list.value = list.value.map(() => Math.round(Math.random() * 10))
}, 3000)

let instance: Experience
onMounted(() => {
  instance = new Experience(container.value)
  instance.resources.ready.then(() => {
    watchEffect(() => {
      const domain = d3.extent(list.value)
      scale.domain(domain)
      instance.world.updateBars(list.value.map((i) => scale(i)))
    })
  })
})

onBeforeUnmount(() => {
  instance.destroy()
})
</script>

<template>
  <canvas ref="container" class="h-[320px] w-[380px]" width="380" height="320"></canvas>
</template>

<style scoped></style>
