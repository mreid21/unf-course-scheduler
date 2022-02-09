<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import Radio from '../types/radio';

const { fields } = defineProps<{ fields: Radio[] }>();

const campus = ref<string>('')

watchEffect(() => {
  console.log(campus.value)
})
</script>

<template>
  <div
    class="grid grid-cols-5 items-center text-center text-gray-500 border border-gray-300 rounded-lg mb-4 text-sm"
  >
    <!--FIX TAG NAMES-->
    <label
      v-for="field in fields"
      :key="field.id"
      class="inline-block border-r border-gray-300"
      :for="field.id"
    >
      <input
        v-model="campus"
        class="absolute appearance-none visibility-hidden hidden"
        type="radio"
        :value="field.value"
        :id="field.id"
        :name="field.name"
      />
      <span class="w-full h-10 grid place-items-center">
        <span>{{ field.text }}</span>
      </span>
    </label>
  </div>
</template>
