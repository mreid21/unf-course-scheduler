<script setup lang="ts">
import { onMounted } from 'vue';
import { useSectionStore } from '../stores/useSectionStore';

const store = useSectionStore();

onMounted(async () => {
  await store.getSections();
});

const editSection = (id: number) => store.editSection(id);

const deleteSection = async (id: number) => await store.deleteSection(id);
</script>

<template>
  <table class="border-collapse shadow-sm w-full text-sm overflow-hidden">
    <thead class="bg-white border-gray-500 shadow-sm">
      <slot name="table-header"></slot>
    </thead>
    <tbody class="text-center">
      <slot
        name="rows"
        :editSection="editSection"
        :deleteSection="deleteSection"
        :sections="store.sectionsWithFormattedTime"
      ></slot>
    </tbody>
  </table>
</template>
