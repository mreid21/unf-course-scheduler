<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import Option from '../types/option';
import Radio from '../types/radio';

interface Props {
  modelValue?: number;
  fields: Radio[];
  hasErrors?: boolean;
}

const { fields } = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const update = (event: any) => {
  emit('update:modelValue', parseInt(event.target.value));
};
</script>

<template>
  <span v-show="hasErrors && modelValue === undefined" class="text-red-500"
    >this field is required</span
  >
  <div
    :class="[hasErrors && modelValue === undefined ? ' border-red-500' : '']"
    class="grid grid-cols-5 items-center text-center text-gray-500 rounded-lg mb-4 text-sm border"
  >
    <!--FIX TAG NAMES-->
    <label
      v-for="field in fields"
      :key="field.id"
      class="inline-block border-r border-gray-300"
      :for="field.id"
    >
      <input
        @change="update"
        :checked="modelValue === field.value"
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
