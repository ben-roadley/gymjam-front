<script setup>
import { ref } from 'vue'
import { Card } from 'primevue'

const props = defineProps(["restTimeInSeconds"])
const emit = defineEmits(['finishedResting'])

let restTimeInSeconds = ref(props.restTimeInSeconds)

setInterval(function() {
    restTimeInSeconds.value--
    if(restTimeInSeconds.value == 0) {
        emit('finishedResting')
    }
}, 1000);

</script>

<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #title>Resting</template>

    <template #subtitle>Chill out man, drink water</template>

    <template #content>
      <p>{{ restTimeInSeconds }} seconds left</p>

    </template>

  </Card>
</template>

<style scoped></style>
