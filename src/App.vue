<script setup lang="ts">
import { ref } from 'vue';
import CourseScheduler from './components/CourseScheduler.vue';
import CourseTable from './components/CourseTable.vue';
import { Section } from './types/section';

const sections = ref<Section[]>([
  {
    section_id: 1,
    course_code: 'COP2220',
    instructor_name: 'Snedden',
    credit_hours: 3,
    room_number: 1203,
    building_number: 15,
    begin_time: '8:30AM',
    end_time: '10:00AM',
    campus_name: 'Face-to-Face',
  },
  {
    section_id: 2,
    course_code: 'COT3210',
    instructor_name: 'Asaithambi',
    credit_hours: 3,
    begin_time: '8:30AM',
    end_time: '10:00AM',
    campus_name: 'Online',
  },
]);
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
