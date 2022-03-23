<script setup lang="ts">
import { computed, onMounted } from 'vue';
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
const {
  form,
  clearForm,
  isEditing,
  submit,
  conflictSections,
  clearConflicts,
  showErrors,
} = useForm();

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

const closeModal = () => {
  clearConflicts();
};

const showModal = computed(() =>
  conflictSections.value.length > 0 ? true : false
);
</script>

<template>
  <base-modal v-show="showModal" @close="closeModal">
    <template v-slot:header>
      <h3>Please clear the following conflicts:</h3>
    </template>
    <template v-slot:main>
      <div v-for="conflict in conflictSections" class="my-4">
        <div class="border flex gap-2 px-2 py-4 rounded-md">
          <span>course: {{ conflict.course_code }}</span>
          <span>instructor: {{ conflict.instructor_name }}</span>
          <span>days: {{ conflict.slot_days }}</span>
          <span
            >time: {{ `${conflict.begin_time} - ${conflict.end_time}` }}</span
          >
          <span class="text-red-500">{{conflict.reason}}</span>
        </div>
      </div>
    </template>
    <template v-slot:actions="{ close }">
      <div class="flex">
        <button class="btn btn--confirm">Overwrite</button>
        <button @click="close" class="btn btn--reject">Cancel</button>
      </div>
    </template>
  </base-modal>
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
      :hasErrors="showErrors"
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
      :hasErrors="showErrors"
    >
      <search-field-item
        :name="item.instructor_name"
        @mousedown="select(item.instructor_id, item.instructor_name)"
      ></search-field-item>
    </search-field>

    <radio-group
      v-model="form.campus"
      :hasErrors="showErrors"
      :fields="options"
    ></radio-group>

    <search-field
      v-model="form.building"
      v-if="courseStore.buildings.length > 0"
      v-slot="{ item, select }"
      :placeholder="'Buildings'"
      :items="courseStore.buildings"
      :filter="'building_number'"
      :id="'building_id'"
      :icon="'building'"
      :hasErrors="showErrors"
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
      :hasErrors="showErrors"
    >
      <search-field-item
        :name="`Room ${item.room_number}`"
        :meta="item.capacity"
        @mousedown="select(item.room_id, `Room ${item.room_number}`)"
      ></search-field-item>
    </search-field>

    <day-picker v-model="form.day" :hasErrors="showErrors"></day-picker>

    <slot-picker
      v-if="courseStore.timeSlots.length > 0"
      v-model="form.slot"
      :timeSlots="courseStore.timeSlots"
    ></slot-picker>

    <div class="lg:flex">
      <input
        class="btn btn--primary"
        type="submit"
        :value="isEditing ? 'Save' : 'Add'"
      />
      <input
        v-if="isEditing"
        class="btn btn--edit"
        type="button"
        value="Duplicate"
        @click="submit('duplicate')"
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
