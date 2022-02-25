<script setup lang="ts">
import { computed, ref } from 'vue';
import useForm from '../composables/useForm';

const { conflicts } = defineProps<{
  conflicts: [];
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <div
    class="fixed flex justify-center items-center inset-0 z-20 backdrop-blur"
  >
    <div class="p-8 bg-white border-rounded-sm shadow-sm">
      <p v-for="(conflict, index) in conflicts" :key="index">{{ conflict }}</p>
      <div class="flex">
        <button class="btn btn--confirm">Overwrite</button>
        <button @click="emit('close')" class="btn btn--reject">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(0.25rem);
}
</style>
