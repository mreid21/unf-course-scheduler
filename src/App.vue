<script setup lang="ts">
import CourseScheduler from './components/CourseScheduler.vue';
import CourseTable from './components/CourseTable.vue';
import CourseTableRow from './components/CourseTableRow.vue';
import CourseTableHeader from './components/CourseTableHeader.vue';
import { ref, watch } from 'vue';

const headers = ref([
  'code',
  'instructors',
  'building',
  'room',
  'campus',
  'days',
  'time',
  'actions',
]);
</script>

<template>
  <div class="lg:h-screen bg-gray-50">
    <div class="app-container">
      <main class="p-4 bg-white border-b-2 border-gray-100 lg:col-span-5">
        <course-scheduler></course-scheduler>
      </main>
      <div class="scrollable shadow-sm lg:col-span-7">
        <course-table>
          <template #table-header>
            <course-table-header :headers="headers">
              <template v-slot="{ header }">
                <span class="mr-2">{{ header }}</span>
              </template>
            </course-table-header>
          </template>
          <template #rows="{ sections }">
            <course-table-row
              :section="section"
              v-for="section in sections"
              :key="section.section_id"
            >
              <template
                #row="{
                  id,
                  code,
                  instructor,
                  building,
                  room,
                  campus,
                  beginTime,
                  endTime,
                  days,
                  editSection,
                  deleteSection,
                }"
              >
                <td>{{ code }}</td>
                <td>{{ instructor }}</td>
                <td>{{ building ? building : 'N/A' }}</td>
                <td>{{ room ? room : 'N/A' }}</td>
                <td>{{ campus }}</td>
                <td>{{ days }}</td>
                <td>{{ `${beginTime} - ${endTime}` }}</td>
                <td class="flex">
                  <input
                    type="button"
                    value="Edit"
                    class="btn btn--edit text-xs"
                    @click="editSection(id)"
                  />
                  <input
                    type="button"
                    value="Delete"
                    class="btn btn--reject text-xs"
                    @click="deleteSection(id)"
                  />
                </td>
              </template>
            </course-table-row>
          </template>
        </course-table>
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
