<script setup>
import { ref } from 'vue'
import { InputNumber, Button, Card } from 'primevue'

const props = defineProps(['exerciseName', 'setNumber', 'targetRepsNumber', 'info'])
const emit = defineEmits(['finishedSet'])

const reps = ref(props.targetRepsNumber)
</script>

<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #title>{{ exerciseName + ' - Set ' + setNumber }}</template>

    <template #subtitle>{{ 'Target: ' + targetRepsNumber + ' Reps, ' + info }}</template>

    <template #content>
      <p>How many did you do?</p>

      <InputNumber
        v-model="reps"
        showButtons
        buttonLayout="vertical"
        style="width: 3rem"
        :min="0"
        :max="99"
      >
        <template #incrementicon>
          <span class="pi pi-plus" />
        </template>
        <template #decrementicon>
          <span class="pi pi-minus" />
        </template>
      </InputNumber>
    </template>

    <template #footer>
      <Button label="Save & continue" class="w-full" @click="$emit('finishedSet', reps)" />
    </template>
  </Card>
</template>

<style scoped></style>
