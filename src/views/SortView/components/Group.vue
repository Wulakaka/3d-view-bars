<script setup lang="ts">
import draggable from 'vuedraggable'
import { computed, defineComponent, ref } from 'vue'

defineComponent({
  name: 'TheGroup'
})

const props = defineProps<{
  list: { id: number; name: string }[]
  group: number
}>()

const emit = defineEmits<{
  (e: 'update:list', val: { id: number; name: string }[]): void
}>()

const list = computed({
  get: () => props.list,
  set: (value) => {
    emit('update:list', value)
  }
})

const drag = ref(false)

const dragOptions = {
  animation: 200,
  disabled: false,
  ghostClass: 'ghost'
}
</script>

<template>
  <draggable
    v-model="list"
    :group="`people` + group"
    @start="drag = true"
    @end="drag = false"
    item-key="id"
    class="flex flex-wrap w-[400px]"
    v-bind="dragOptions"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }"
  >
    <template #item="{ element }">
      <div class="w-[100px] h-[100px] outline outline-amber-200 outline-1">
        {{ element.name }}
      </div>
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
