<script setup lang="ts">
import { Section } from '../types/section';
import { useSectionStore } from '../stores/useSectionStore';

const store = useSectionStore();
const { section } = defineProps<{
  section: Section;
}>();
</script>

<template>
  <tr>
    <slot
      name="row"
      :row="section.section_row"
      :id="section.section_id"
      :code="section.course_code"
      :instructor="section.instructor_name"
      :building="section.building_number"
      :room="section.room_number"
      :campus="section.campus_name"
      :beginTime="section.begin_time"
      :endTime="section.end_time"
      :days="section.slot_days"
    ></slot>
  </tr>
</template>
