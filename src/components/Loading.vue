<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { Button, Card } from 'primevue'

const props = defineProps(['workout'])
defineEmits(['finishedLoading'])

const isLoading = ref(true)

onMounted(async () => {
  axios
    .get('http://127.0.0.1:8000/workout/workouts/1/')
    .then((response) => {
      props.workout.value = response.data
      isLoading.value = false
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
})
</script>

<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #title>Greetings!</template>

    <template #subtitle>This is the ultimate workout app.</template>

    <template #content>
      <p>Another day, another workout lol.</p>
    </template>

    <template #footer v-if="!isLoading">
      <Button label="Start repping!" class="w-full" @click="$emit('finishedLoading')" />
    </template>
  </Card>
</template>

<style scoped></style>
