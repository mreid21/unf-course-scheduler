<script setup lang="ts">
import { computed } from 'vue';
import useTime from '../composables/useTime';
import { Section } from '../types/section';

const { formatTime } = useTime();
const { section } = defineProps<{
  section: Section;
}>();

const beginTime = computed(() => formatTime(section.begin_time));
const endTime = computed(() => formatTime(section.end_time));
</script>

<template>
  <tr>
    <slot
      name="row"
      :code="section.course_code"
      :instructor="section.instructor_name"
      :building="section.building_number"
      :room="section.room_number"
      :campus="section.campus_name"
      :beginTime="beginTime"
      :endTime="endTime"
    ></slot>
  </tr>
</template>
