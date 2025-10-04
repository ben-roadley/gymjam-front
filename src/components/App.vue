<script setup>
import Repping from './Repping.vue'
import { Exercise, Set, Workout, getOrderedSetsInWorkout } from '../models/models'

// initialize some mock data
const set1 = new Set('Use little table', 12)
const set2 = new Set('Use little table', 12)
const set3 = new Set('Use little table', 12)
const set4 = new Set('Go for it', 5)
const easy_dips = new Exercise('Easy Dips', [set1, set2, set3])
const pushUps = new Exercise('PushUps', [set4])
const exercises = [easy_dips, pushUps]
const workout = new Workout("Ben's workout", exercises)

const sets = getOrderedSetsInWorkout(workout)

function callbackFinishedSet(reps) {
  console.log("ok")
  console.log(reps)
  //TODO keep track of actual performed reps, to save in database
}
</script>

<template>
  <Repping :exerciseName="exercises[0].name" setNumber="1" targetRepsNumber="12" @finishedSet="callbackFinishedSet" />
</template>

<style scoped></style>
