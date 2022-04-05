<script setup lang="ts">
import CourseScheduler from '../components/CourseScheduler.vue';
import CourseTable from '../components/CourseTable.vue';
import CourseTableRow from '../components/CourseTableRow.vue';
import CourseTableHeader from '../components/CourseTableHeader.vue';
import { useDownloadCSV } from '../composables/useDownloadCSV';
import { useUserStore } from '../stores/useUserStore';

const headers = [
  'id',
  'code',
  'instructors',
  'building',
  'room',
  'campus',
  'days',
  'time',
  'actions',
];
const store = useUserStore();
const resetPlanID = () => store.$patch({ planID: null });

const { downloadCSV } = useDownloadCSV();
</script>

<template>
  <main class="px-4 bg-white border-b-2 border-gray-100 lg:col-span-5">
    <div class="flex my-2">
      <router-link
        @click="resetPlanID"
        :to="{ name: 'Plans' }"
        class="link link--neutral"
      >
        <font-awesome-icon icon="arrow-circle-left"></font-awesome-icon>
        <span class="ml-2">All Plans</span>
      </router-link>
      <button @click="downloadCSV" class="link link--neutral">
        <font-awesome-icon icon="file-csv"></font-awesome-icon>
        <span class="ml-2">Export CSV</span>
      </button>
    </div>
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
      <template #rows="{ sections, editSection, deleteSection }">
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
            }"
          >
            <td class="px-4">{{ id }}</td>
            <td>{{ code }}</td>
            <td>{{ instructor }}</td>
            <td>{{ building ? building : 'N/A' }}</td>
            <td>{{ room ? room : 'N/A' }}</td>
            <td>{{ campus }}</td>
            <td>{{ days ? days : 'N/A' }}</td>
            <td>{{ beginTime ? `${beginTime} - ${endTime}` : 'N/A' }}</td>
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
</template>
