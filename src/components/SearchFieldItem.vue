<script setup lang="ts">
interface Props {
  name: string;
  meta?: string | number;
}

const { name, meta } = defineProps<Props>();
</script>

<template>
  <div class="flex justify-between gap-8 hover:bg-blue-50 px-4">
    <p>{{ name }}</p>
    <p class="text-gray-400 justify-self-end truncate">{{ meta }}</p>
  </div>
</template>
