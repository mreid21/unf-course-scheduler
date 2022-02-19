<script setup lang="ts">
import { onMounted } from 'vue';
import { useSectionStore } from '../stores/useSectionStore';
import { Section } from '../types/section';

const store = useSectionStore();

onMounted(async () => {
  await store.getSections();
});
</script>

<template>
  <table class="border-collapse shadow-sm w-full text-sm">
    <thead class="sticky top-0 bg-white border-gray-500">
      <tr>
        <th>Course Code</th>
        <th>Instructor</th>
        <th>Building</th>
        <th>Room</th>
        <th>Campus</th>
        <th>Time</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr v-for="section in store.sections" :key="section.section_id">
        <td>{{ section.course_code }}</td>
        <td>{{ section.instructor_name }}</td>
        <td>{{ section.building_number ? section.building_number : 'N/A' }}</td>
        <td>{{ section.room_number ? section.room_number : 'N/A' }}</td>
        <td>{{ section.campus_name }}</td>
        <td>{{ `${section.begin_time} - ${section.end_time}` }}</td>
        <td>
          <div class="flex">
            <button class="btn btn--edit">Edit</button>
            <button class="btn btn--reject">Delete</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th,
td {
  padding: 0.75rem 1.5rem;
}

tr:nth-child(even) {
  background-color: white;
}
</style>
