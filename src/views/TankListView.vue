<script setup lang="ts">
import CatchmentTank from '@/components/CatchmentTank/CatchmentTank.vue'
</script>

<template>
  <div class="flex flex-wrap justify-center h-[90vh] items-center">
    <CatchmentTank v-for="i in 1" :key="i" />
  </div>
</template>

<style scoped></style>
