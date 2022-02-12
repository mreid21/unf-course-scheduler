<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { DayOfWeek } from '../types/courseform';

const days = ref<DayOfWeek[]>(['MWF', 'MW', 'TR', 'M', 'T', 'W', 'R', 'F'])

const changeSelection = (e: any) => {
  emit('update:modelValue', e.target.value)
  console.log(e.target.value)
}

defineProps<{modelValue?: string}>()
const emit = defineEmits(['update:modelValue']);

</script>

<template>
  <div class="flex flex-wrap justify-center gap-3 border p-2 mb-8 rounded-md">
    <div v-for="(day, index) in days" :key="index">
      <input @change="changeSelection" :id="day.toLowerCase()" class="appearance-none" :value="day" type="radio" name="radio" />
      <label
        class="inline-block border w-12 h-12 justify-center items-center bg-white rounded-md hover:bg-blue-50"
        :for="day.toLowerCase()"
      >
        <div class="grid w-full h-full place-items-center">
          <span class="">{{day}}</span>
        </div>
      </label>
    </div>
  </div>
</template>
