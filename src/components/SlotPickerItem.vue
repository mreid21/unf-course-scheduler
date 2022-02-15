<script setup lang="ts">
import { computed } from 'vue';
import Option from '../types/option';
import useTime from '../composables/useTime';
import TimeSlot from '../types/timeSlot';

const { timeSlot } = defineProps<{ timeSlot: TimeSlot; isSelected: boolean }>();

const emit = defineEmits<{
  (e: 'selected', choice: Option): void;
}>();

const { formatTime } = useTime();

const beginTime = computed(() => formatTime(timeSlot.begin_time));

const endTime = computed(() => formatTime(timeSlot.end_time));
</script>

<template>
  <div
    @click="
      emit('selected', {
        id: timeSlot.slot_id,
        value: `${beginTime} - ${endTime}`,
      })
    "
    class="px-2 py-4 border border-gray-400 rounded-lg text-center text-sm text-gray-700 transition-transform duration-200 hover:bg-blue-100 cursor-pointer"
    :class="[isSelected ? 'bg-blue-100' : '']"
  >
    <span
      :class="[isSelected ? 'text-blue-700' : '']"
      class="inline-block mr-2"
      >{{ `${beginTime} - ${endTime}` }}</span
    >
  </div>
</template>
