<script setup lang="ts">
import TimeSlot from '../types/timeslot';

interface Props {
  timeSlots: TimeSlot[];
}

const { timeSlots } = defineProps<Props>();
</script>

<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
    <!--active status-->
    <div
      v-for="slot in timeSlots"
      :key="slot.slot_id"
      class="px-2 py-4 border border-gray-400 rounded-lg text-center text-sm text-gray-700 transition-transform duration-200 hover:bg-blue-100"
    >
      <i class="fa-regular fa-clock"></i>
      <span class="inline-block">{{
        `${slot.begin_time} - ${slot.end_time}`
      }}</span>
    </div>
  </div>
</template>
