<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import TimeSlot from '../types/timeslot';
import SlotPickerItem from './SlotPickerItem.vue'

interface Props {
  timeSlots: TimeSlot[];
}

const { timeSlots } = defineProps<Props>();

const currentPage = computed(() => timeSlots.slice(0, 10))

</script>

<template>
  <div class="flex gap-2">
    <div class="basis-4 grow-0 shrink-0 flex items-center">
      <font-awesome-icon  :icon="'chevron-left'"></font-awesome-icon>
    </div>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 w-full">
      <SlotPickerItem :timeSlot="time" v-for="time in currentPage" :key="time.slot_id"></SlotPickerItem>
    </div>
    <div class="basis-4 grow-0 shrink-0 flex items-center">
      <font-awesome-icon  :icon="'chevron-right'"></font-awesome-icon>
    </div>
  </div>
</template>
