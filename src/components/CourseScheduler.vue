<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch } from 'vue';
import useDatabase from '../composables/useDatabase';
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
} = useDatabase();

const formOptions = reactive({
  courses: null,
  instructors: null,
  buildings: null,
  rooms: null,
  timeSlots: null,
}) as FormOptions;

const section = reactive({}) as CourseForm;

const buildingSelected = ref(false);

watch(
  () => section.building,
  async () => {
    section.room = undefined;
    if (section.building) {
      buildingSelected.value = false;
      formOptions.rooms = await fetchRooms(section.building.id);
      buildingSelected.value = true;
    } else {
      buildingSelected.value = false;
    }
  }
);

const daySelected = ref(false);

watch(
  () => section.day,
  async () => {
    if (section.day) {
      daySelected.value = false;
      formOptions.timeSlots = await fetchTimeSlots(section.day);
      daySelected.value = true;
    } else {
      daySelected.value = false;
    }
  }
);

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

const clearForm = () => {
  for (let option in section) {
    if (option !== 'day' && option !== 'campus') {
      section[option as keyof CourseForm] = undefined;
    }
  }
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
        @mousedown="select(item.course_id, item.course_code, item.credit_hours)"
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

    <radio-group v-model="section.campus" :fields="options"></radio-group>

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
      v-if="buildingSelected"
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
    <slot-picker
      v-if="daySelected && timeSlots"
      v-model="section.slot"
      :timeSlots="timeSlots"
    ></slot-picker>
    <div class="lg:flex">
      <input class="btn btn--confirm" type="submit" value="Add" />
      <button @click="clearForm" class="btn btn--reject">Clear</button>
    </div>
  </form>
  <p>{{section}}</p>
</template>
