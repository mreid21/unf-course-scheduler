<script setup lang="ts">
import TimeSlot from '../types/timeslot';
import SlotPickerItem from './SlotPickerItem.vue'

interface Props {
  timeSlots: TimeSlot[];
}

const { timeSlots } = defineProps<Props>();
</script>

<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
    <SlotPickerItem :timeSlot="time" v-for="time in timeSlots" :key="time.slot_id"></SlotPickerItem>
  </div>
</template>
