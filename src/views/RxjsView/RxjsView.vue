<script setup lang="ts">
import { Subject, from, Observable, filter } from 'rxjs'
import { onUnmounted } from 'vue'

const subject = new Subject<number>()
// 转换之后也不会堆积
const o = subject.pipe(filter(() => true))

// const observable = new Observable<number>(function subscribe(subscriber) {
//   subscriber.next(3)
//   const timer = setTimeout(() => {
//     subscriber.next(4)
//   }, 1000)
//   return function unsubscribe() {
//     clearTimeout(timer)
//   }
// })
// const observable = from([4, 5])
// observable.subscribe(subject)

const subscriptionA = o.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
  complete() {
    console.log('observerA complete')
  }
})

subject.next(1)

const subscriptionB = o.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
  complete() {
    console.log('observerB complete')
  }
})

subject.next(2)

subscriptionA.add(subscriptionB)

subscriptionA.unsubscribe()
subject.next(3)

o.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
  complete() {
    console.log('observerA complete')
  }
})

o.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
  complete() {
    console.log('observerB complete')
  }
})
subject.next(4)

onUnmounted(() => {
  subscriptionA.unsubscribe()
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>
