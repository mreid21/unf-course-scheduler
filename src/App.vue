<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CourseScheduler from './components/CourseScheduler.vue';
import CourseTable from './components/CourseTable.vue';
import { Section } from './types/section';
import { useSectionStore } from './stores/useSectionStore';

const sections = ref([]);
const store = useSectionStore();

onMounted(async () => {
  await store.getSections();
  if (store.sections) {
    Object.assign(sections.value, store.sections);
  }
});
</script>

<template>
  <div class="lg:h-screen bg-gray-50">
    <div class="app-container">
      <main class="p-4 bg-white border-b-2 border-gray-100 lg:col-span-5">
        <course-scheduler></course-scheduler>
      </main>
      <div class="scrollable shadow-sm lg:col-span-7">
        <course-table :sections="sections"></course-table>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
