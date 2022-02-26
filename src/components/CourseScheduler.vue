<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue';
import useDatabase from '../composables/useDatabase';
import options from '../assets/campusoptions';
import RadioGroup from './RadioGroup.vue';
import SearchField from './SearchField.vue';
import SearchFieldItem from './SearchFieldItem.vue';
import DayPicker from './DayPicker.vue';
import SlotPicker from './SlotPicker.vue';
import { useCourseStore } from '../stores/useCourseStore';
import useForm from '../composables/useForm';
import BaseModal from './BaseModal.vue';

const { fetchCourses, fetchInstructors, fetchBuildings } = useDatabase();
const courseStore = useCourseStore();
const { form, clearForm, isEditing, submit, conflicts, clearConflicts } =
  useForm();

onMounted(async () => {
  const [courses, instructors, buildings] = await courseStore.getFieldData([
    fetchCourses,
    fetchInstructors,
    fetchBuildings,
  ]);
  courseStore.$patch({
    courses,
    instructors,
    buildings,
  });
});

const showModal = ref(false);
watch(conflicts, () => {
  if (conflicts.value && conflicts.value.length > 0) showModal.value = true;
});

const closeModal = () => {
  showModal.value = false;
  clearConflicts();
};
</script>

<template>
  <base-modal
    v-show="showModal"
    @close="closeModal"
    :conflicts="conflicts ? conflicts : []"
  ></base-modal>
  <form
    id="course-scheduler"
    @submit.prevent="isEditing ? submit('save') : submit('add')"
  >
    <!-- passes select method down as prop because search field and search field item share the same context -->
    <search-field
      v-model="form.course"
      v-if="courseStore.courses.length > 0"
      v-slot="{ item, select }"
      :placeholder="'Courses'"
      :items="courseStore.courses"
      :filter="'course_code'"
      :id="'course_id'"
      :icon="'graduation-cap'"
    >
      <search-field-item
        :name="item.course_code"
        :meta="item.course_title"
        @mousedown="select(item.course_id, item.course_code, item.credit_hours)"
      ></search-field-item>
    </search-field>

    <search-field
      v-model="form.instructor"
      v-if="courseStore.instructors.length > 0"
      v-slot="{ item, select }"
      :placeholder="'Instructors'"
      :items="courseStore.instructors"
      :filter="'instructor_name'"
      :id="'instructor_id'"
      :icon="'chalkboard-teacher'"
    >
      <search-field-item
        :name="item.instructor_name"
        @mousedown="select(item.instructor_id, item.instructor_name)"
      ></search-field-item>
    </search-field>

    <radio-group v-model="form.campus" :fields="options"></radio-group>

    <search-field
      v-model="form.building"
      v-if="courseStore.buildings.length > 0"
      v-slot="{ item, select }"
      :placeholder="'Buildings'"
      :items="courseStore.buildings"
      :filter="'building_number'"
      :id="'building_id'"
      :icon="'building'"
    >
      <search-field-item
        :name="`Building ${item.building_number}`"
        :meta="item.building_name"
        @mousedown="
          select(item.building_id, `Building ${item.building_number}`)
        "
      ></search-field-item>
    </search-field>

    <search-field
      v-model="form.room"
      v-slot="{ item, select }"
      v-if="courseStore.rooms.length > 0"
      :placeholder="'Rooms'"
      :items="courseStore.rooms"
      :filter="'room_number'"
      :id="'room_id'"
      :icon="'door-open'"
    >
      <search-field-item
        :name="`Room ${item.room_number}`"
        :meta="item.capacity"
        @mousedown="select(item.room_id, `Room ${item.room_number}`)"
      ></search-field-item>
    </search-field>

    <day-picker v-model="form.day"></day-picker>

    <slot-picker
      v-if="courseStore.timeSlots.length > 0"
      v-model="form.slot"
      :timeSlots="courseStore.timeSlots"
    ></slot-picker>

    <div class="lg:flex">
      <input
        class="btn btn--confirm"
        type="submit"
        :value="isEditing ? 'Save' : 'Add'"
      />
      <input
        v-if="isEditing"
        class="btn btn--edit"
        type="button"
        value="Duplicate"
      />
      <input
        @click="clearForm"
        type="button"
        :value="isEditing ? 'Stop Editing' : 'Clear'"
        class="btn btn--reject"
      />
    </div>
  </form>
</template>
