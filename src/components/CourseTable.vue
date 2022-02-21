<script setup lang="ts">
import { onMounted } from 'vue';
import { useSectionStore } from '../stores/useSectionStore';

const store = useSectionStore();

onMounted(async () => {
  await store.getSections();
});
</script>

<template>
  <table class="border-collapse shadow-sm w-full text-sm overflow-hidden">
    <thead class="sticky top-0 bg-white border-gray-500 shadow-sm">
      <slot name="table-header"></slot>
    </thead>
    <tbody class="text-center">
      <slot name="rows" :sections="store.sections"></slot>
    </tbody>
  </table>
</template>
