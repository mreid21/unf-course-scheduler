<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import useDatabase from '../composables/useDatabase';
import options from '../assets/campusoptions';
import RadioGroup from './RadioGroup.vue';
import SearchField from './SearchField.vue';
import SearchFieldItem from './SearchFieldItem.vue';
import DayPicker from './DayPicker.vue';
import SlotPicker from './SlotPicker.vue';
import { CourseForm } from '../types/courseForm';
import { useCourseStore } from '../stores/useCourseStore';

const {
  fetchCourses,
  fetchInstructors,
  fetchBuildings,
  fetchRooms,
  fetchTimeSlots,
  fetchParallel,
} = useDatabase();

const store = useCourseStore();

onMounted(async () => {
  const [courses, instructors, buildings] = await store.getFieldData([
    fetchCourses,
    fetchInstructors,
    fetchBuildings,
  ]);
  store.$patch({
    courses,
    instructors,
    buildings,
  });
});

const section = reactive({}) as CourseForm;

watch(
  () => section.building,
  async () => {
    if (section.building) {
      await store.getRooms(section.building.id);
    } else {
      section.room = undefined;
      store.rooms = [];
    }
  }
);

watch([() => section.day, () => section.course], async () => {
  if (section.day && section.course) {
    await store.getTimeSlots(section.day, section.course.meta as number);
  } else {
    store.timeSlots = [];
  }
});

const clearForm = () => {
  for (let option in section) {
    if (option !== 'day' && option !== 'campus') {
      section[option as keyof CourseForm] = undefined;
    }
  }
};
</script>

<template>
  <form id="course-scheduler" @submit.prevent="() => console.log('hello')">
    <!-- passes select method down as prop because search field and search field item share the same context -->
    <search-field
      v-model="section.course"
      v-if="store.courses"
      v-slot="{ item, select }"
      :placeholder="'Courses'"
      :items="store.courses"
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
      v-if="store.instructors"
      v-slot="{ item, select }"
      :placeholder="'Instructors'"
      :items="store.instructors"
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
      v-if="store.buildings"
      v-slot="{ item, select }"
      :placeholder="'Buildings'"
      :items="store.buildings"
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
      v-if="store.rooms.length > 0"
      :placeholder="'Rooms'"
      :items="store.rooms"
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
      v-if="store.timeSlots.length > 0"
      v-model="section.slot"
      :timeSlots="store.timeSlots"
    ></slot-picker>

    <div class="lg:flex">
      <input class="btn btn--confirm" type="submit" value="Add" />
      <input
        type="button"
        value="Clear"
        @click="clearForm"
        class="btn btn--reject"
      />
    </div>
  </form>
  <p>{{ section }}</p>
</template>
