<script setup lang="ts">
import Group from './components/Group.vue'
import { ref } from 'vue'
import draggable from 'vuedraggable'
const groups = ref([
  {
    id: 1,
    children: [
      { id: 1, name: 'John Doe1' },
      { id: 2, name: 'Jane Doe1' },
      { id: 3, name: 'Jake Doe1' },
      { id: 4, name: 'Jake Doe14' },
      { id: 5, name: 'Jake Doe15' },
      { id: 6, name: 'Jake Doe16' }
    ]
  },
  {
    id: 2,
    children: [
      { id: 1, name: 'John Doe2' },
      { id: 2, name: 'Jane Doe2' },
      { id: 3, name: 'Jake Doe2' }
    ]
  },
  {
    id: 3,
    children: [
      { id: 1, name: 'John Doe3' },
      { id: 2, name: 'Jane Doe3' },
      { id: 3, name: 'Jake Doe3' }
    ]
  }
])

const drag = ref(false)

const dragOptions = {
  animation: 200,
  disabled: false,
  ghostClass: 'ghost'
}
</script>

<template>
  <draggable
    v-model="groups"
    group="people"
    @start="drag = true"
    @end="drag = false"
    item-key="id"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }"
    v-bind="dragOptions"
  >
    <template #item="{ element }">
      <Group v-model:list="element.children" :group="element.id"></Group>
    </template>
  </draggable>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
