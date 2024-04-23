<script setup lang="ts">
import { Subject, from, Observable } from 'rxjs'
import { onUnmounted } from 'vue'

const subject = new Subject<number>()

// const observable = new Observable<number>(function subscribe(subscriber) {
//   subscriber.next(3)
//   const timer = setTimeout(() => {
//     subscriber.next(4)
//   }, 1000)
//   return function unsubscribe() {
//     clearTimeout(timer)
//   }
// })
const observable = from([4, 5])
observable.subscribe(subject)

const subscriptionA = subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
  complete() {
    console.log('observerA complete')
  }
})

subject.next(1)

const subscriptionB = subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
  complete() {
    console.log('observerB complete')
  }
})

subject.next(2)

subscriptionA.add(subscriptionB)
onUnmounted(() => {
  subscriptionA.unsubscribe()
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>
