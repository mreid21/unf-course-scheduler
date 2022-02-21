<script setup lang="ts">
import { computed } from 'vue';
import useTime from '../composables/useTime';
import { Section } from '../types/section';
import { useSectionStore } from '../stores/useSectionStore';

const store = useSectionStore();

const { formatTime } = useTime();
const { section } = defineProps<{
  section: Section;
}>();

const beginTime = computed(() => formatTime(section.begin_time));
const endTime = computed(() => formatTime(section.end_time));

const editSection = (id: number) => store.editSection(id);

const deleteSection = async (id: number) => await store.deleteSection(id);
</script>

<template>
  <tr>
    <slot
      name="row"
      :id="section.section_id"
      :code="section.course_code"
      :instructor="section.instructor_name"
      :building="section.building_number"
      :room="section.room_number"
      :campus="section.campus_name"
      :beginTime="beginTime"
      :endTime="endTime"
      :editSection="editSection"
      :deleteSection="deleteSection"
    ></slot>
  </tr>
</template>
