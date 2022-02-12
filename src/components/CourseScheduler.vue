<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue';
import useSupabase from '../composables/useSupabase';
import options from '../assets/campusoptions';
import RadioGroup from './RadioGroup.vue';
import SearchField from './SearchField.vue';
import SearchFieldItem from './SearchFieldItem.vue';
import DayPicker from './DayPicker.vue';
import SlotPicker from './SlotPicker.vue';
import { CourseForm, FormOptions } from '../types/courseform';

const {
  fetchCourses,
  fetchInstructors,
  fetchBuildings,
  fetchRooms,
  fetchTimeSlots,
  fetchParallel,
} = useSupabase();

const formOptions = reactive({
  courses: null,
  instructors: null,
  buildings: null,
  rooms: null,
  timeSlots: null,
}) as FormOptions;

const section = reactive({}) as CourseForm;

onMounted(async () => {
  const result = await fetchParallel([
    fetchCourses,
    fetchInstructors,
    fetchBuildings,
  ]);

  Object.keys(formOptions).forEach((key, index) => {
    formOptions[key as keyof FormOptions] = result[index];
  });
});

const { courses, instructors, buildings, rooms, timeSlots } =
  toRefs(formOptions);

const addSection = () => {
  console.log('added section');
};
</script>

<template>
  <form id="course-scheduler" @submit.prevent="addSection">
    <!-- passes select method down as prop because search field and search field item share the same context -->
    <search-field
      v-model="section.course"
      v-if="courses"
      v-slot="{ item, select }"
      :placeholder="'Courses'"
      :items="courses"
      :filter="'course_code'"
      :id="'course_id'"
      :icon="'graduation-cap'"
    >
      <search-field-item
        :name="item.course_code"
        :meta="item.course_title"
        @mousedown="select(item.course_id, item.course_code)"
      ></search-field-item>
    </search-field>

    <search-field
      v-model="section.instructor"
      v-if="instructors"
      v-slot="{ item, select }"
      :placeholder="'Instructors'"
      :items="instructors"
      :filter="'instructor_name'"
      :id="'instructor_id'"
      :icon="'chalkboard-teacher'"
    >
      <search-field-item
        :name="item.instructor_name"
        @mousedown="select(item.instructor_id, item.instructor_name)"
      ></search-field-item>
    </search-field>

    <radio-group :fields="options"></radio-group>

    <search-field
      v-model="section.building"
      v-if="buildings"
      v-slot="{ item, select }"
      :placeholder="'Buildings'"
      :items="buildings"
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
      v-model="section.room"
      v-slot="{ item, select }"
      :active="rooms !== null"
      :placeholder="'Rooms'"
      :items="rooms"
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

    <day-picker v-model="section.day"></day-picker>
    <slot-picker v-if="timeSlots" :timeSlots="timeSlots"></slot-picker>
    <div>
      <p>{{ section }}</p>
    </div>
    <div class="lg:flex">
      <input class="btn btn--confirm" type="submit" value="Add" />
      <button class="btn btn--reject">Clear</button>
    </div>
  </form>
</template>
