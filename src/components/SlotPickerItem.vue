<script setup lang="ts">
import { computed } from 'vue';
import TimeSlot from '../types/timeslot';

const { timeSlot } = defineProps<{ timeSlot: TimeSlot }>();

const formatTime = (time: string) => {
  let hours = parseInt(time.slice(0, 2));
  const minutes = time.slice(3, 5);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes}${suffix}`;
};

const beginTime = computed(() => formatTime(timeSlot.begin_time));

const endTime = computed(() => formatTime(timeSlot.end_time));
</script>

<template>
  <div
    class="px-2 py-4 border border-gray-400 rounded-lg text-center text-sm text-gray-700 transition-transform duration-200 hover:bg-blue-100"
  >
    <span class="inline-block mr-2">{{ `${beginTime} - ${endTime}` }}</span>
  </div>
</template>
