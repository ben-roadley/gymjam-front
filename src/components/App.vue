<script setup>
import { computed, ref } from 'vue'
import Repping from './Repping.vue'
import Resting from './Resting.vue'
import FinishedWorkout from './FinishedWorkout.vue'
import { RESTING_TIME } from '@/constants'

const currentComponent = ref('Repping')

const components = {
  Repping,
  Resting,
  FinishedWorkout,
}

// working with mock json data for now
import workout from '@/models/mock' with { type: 'json' }
const sets = getOrderedSetsInWorkout(workout)

let currentSetIndex = 0

const set = ref(sets[currentSetIndex])

const currentProperties = computed(() => {
  if (currentComponent.value == 'Resting') {
    return { restTimeInSeconds: RESTING_TIME }
  } else if (currentComponent.value == 'Repping') {
    return {
      exerciseName: set.value.exerciseName,
      setNumber: set.value.set.order,
      targetRepsNumber: set.value.set.nbReps,
    }
  }
})

function callbackFinishedSet(reps) {
  currentComponent.value = 'Resting'
  console.log('Actual reps: ' + reps)
}

function callbackFinishedResting() {
  if (currentSetIndex + 1 in sets) {
    currentComponent.value = 'Repping'
    currentSetIndex++
    set.value = sets[currentSetIndex]
  } else {
    currentComponent.value = 'FinishedWorkout'
  }
}

function getOrderedSetsInWorkout(workout) {
  const sets = []
  for (let exercise of workout.exercises) {
    for (let set of exercise.sets) {
      sets.push({
        exerciseName: exercise.name,
        set: set,
      })
    }
  }
  return sets
}
</script>

<template>
  <div class="page-container">
    <component
      :is="components[currentComponent]"
      v-bind="currentProperties"
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
