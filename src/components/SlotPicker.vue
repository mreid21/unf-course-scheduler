<script setup lang="ts">
import { computed, ref } from 'vue';
import Option from '../types/option';
import TimeSlot from '../types/timeslot';
import SlotPickerItem from './SlotPickerItem.vue';

interface Props {
  timeSlots: TimeSlot[];
  pageSize: number;
  modelValue?: Option;
}

const { timeSlots, pageSize } = withDefaults(defineProps<Props>(), {
  pageSize: 9,
});

const emit = defineEmits(['update:modelValue']);

const pages = computed(() => {
  if (timeSlots) {
    return Math.ceil(timeSlots.length / pageSize);
  } else return 1;
});

const currentPage = ref(1);

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < pages.value) {
    currentPage.value++;
  }
};

const currentPageItems = computed(() =>
  pageSize > 1
    ? timeSlots.slice(
        (currentPage.value - 1) * pageSize,
        pageSize * currentPage.value
      )
    : timeSlots
);

const update = (choice: Option) => {
  emit('update:modelValue', choice);
};
</script>

<template>
  <div class="flex gap-4 items-center">
    <font-awesome-icon
      @click="previousPage"
      v-if="pages > 1"
      class="hover:scale-125 transition-all ease-in-out duration-100 mb-4"
      size="lg"
      icon="chevron-left"
    ></font-awesome-icon>
    <div v-if="timeSlots.length > 0" class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 w-full">
      <SlotPickerItem
        @selected="update"
        :isSelected="
          modelValue && modelValue.id === time.slot_id ? true : false
        "
        :timeSlot="time"
        v-for="time in currentPageItems"
        :key="time.slot_id"
      ></SlotPickerItem>
    </div>
    <p v-else class="text-center">No Items to Show</p>
    <font-awesome-icon
      @click="nextPage"
      v-if="pages > 1"
      class="hover:scale-125 transition-all ease-in-out duration-100 mb-4"
      size="lg"
      icon="chevron-right"
    ></font-awesome-icon>
  </div>
</template>
