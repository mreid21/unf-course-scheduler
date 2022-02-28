<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import useTime from '../composables/useTime';
import { useSectionStore } from '../stores/useSectionStore';
import { Section } from '../types/section';
import BaseModal from './BaseModal.vue';
const store = useSectionStore();
const { formatTime } = useTime();

onMounted(async () => {
  await store.getSections();
});

const editSection = (id: number) => store.editSection(id);

const deleteSection = (id: number) => {
  section.value = store.findSectionByID(id);
  sectionID.value = id;
  openModal();
};

const confirmDelete = async () => {
  closeModal();
  await store.deleteSection(sectionID.value);
};

const sectionID = ref(0);
const showModal = ref(false);
const section = ref<Section>();
const beginTime = computed(() =>
  section.value ? formatTime(section.value.begin_time) : ''
);
const endTime = computed(() =>
  section.value ? formatTime(section.value.end_time) : ''
);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <base-modal v-show="showModal" @close="closeModal">
    <template v-slot:main>
      <p v-if="section" class="mt-2 p-6">
        {{
          `Are you sure you want to delete course ${section.course_code} taught by ${section.instructor_name} from ${beginTime}-${endTime}?`
        }}
      </p>
    </template>
    <template v-slot:actions="{ close }">
      <div class="flex">
        <button @click="confirmDelete" class="btn btn--reject">Delete</button>
        <button @click="close" class="btn btn--confirm">Cancel</button>
      </div>
    </template>
  </base-modal>
  <table class="border-collapse shadow-sm w-full text-sm overflow-hidden">
    <thead class="bg-white border-gray-500 shadow-sm">
      <slot name="table-header"></slot>
    </thead>
    <tbody class="text-center">
      <slot
        name="rows"
        :editSection="editSection"
        :deleteSection="deleteSection"
        :sections="store.sectionsWithFormattedTime"
      ></slot>
    </tbody>
  </table>
</template>
