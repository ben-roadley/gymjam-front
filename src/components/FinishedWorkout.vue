<script setup>
import { Card } from 'primevue'
</script>

<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #title>Finshed Workout!</template>

    <template #subtitle>Nice, time to get a shower</template>

    <template #content>
      <p>Display here a summary of the workout.</p>
    </template>
  </Card>
</template>

<style scoped></style>
