<script setup>
import { computed, ref } from 'vue'
import Loading from './Loading.vue'
import Repping from './Repping.vue'
import Resting from './Resting.vue'
import FinishedWorkout from './FinishedWorkout.vue'
import { RESTING_TIME } from '@/constants'

const components = {
  Loading,
  Repping,
  Resting,
  FinishedWorkout,
}
const currentComponent = ref('Loading')

const workout = ref()
let sets = null
const currentSet = ref(null)

const currentProps = computed(() => {
  if (currentComponent.value == 'Loading') {
    return { workout: workout }
  }
  if (currentComponent.value == 'Resting') {
    return { restTimeInSeconds: RESTING_TIME }
  } else if (currentComponent.value == 'Repping') {
    return {
      exerciseName: currentSet.value.exerciseName,
      setNumber: currentSet.value.order,
      targetRepsNumber: currentSet.value.targetRepsNumber,
      info: currentSet.value.info,
    }
  }
})

function callbackFinishedLoading() {
  sets = getOrderedSetsInWorkout()
  currentSet.value = sets.next().value
  currentComponent.value = 'Repping'
}

function callbackFinishedSet(reps) {
  currentComponent.value = 'Resting'
  console.log('Actual reps: ' + reps)
}

function callbackFinishedResting() {
  const nextSet = sets.next().value
  if (nextSet) {
    currentComponent.value = 'Repping'
    currentSet.value = nextSet
  } else {
    currentComponent.value = 'FinishedWorkout'
  }
}

function getOrderedSetsInWorkout() {
  const sets = []
  for (let exercise of workout.value.exercises) {
    for (let set of exercise.sets_of_reps) {
      sets.push({
        exerciseName: exercise.name,
        order: set.order,
        targetRepsNumber: set.nb_reps,
        info: set.info,
      })
    }
  }
  return sets[Symbol.iterator]()
}
</script>

<template>
  <div class="page-container">
    <component
      :is="components[currentComponent]"
      v-bind="currentProps"
      @finishedLoading="callbackFinishedLoading"
      @finishedSet="callbackFinishedSet"
      @finishedResting="callbackFinishedResting"
    ></component>
  </div>
</template>

<style scoped>
.page-container {
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
