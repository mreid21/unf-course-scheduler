<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue';
import useSupabase from '../composables/useSupabase'
import options from '../assets/campusoptions';
import Course from '../types/course';
import Instructor from '../types/professor';
import RadioGroup from './RadioGroup.vue';
import SearchField from './SearchField.vue';
import SearchFieldItem from './SearchFieldItem.vue';
import DayPicker from './DayPicker.vue';
import Building from '../types/building';
import Room from '../types/room';

const {fetchCourses, fetchInstructors, fetchBuildings, fetchRooms} = useSupabase()

interface FormData {
  courses: Course[] | null | undefined,
  instructors: Instructor[] | null | undefined,
  buildings: Building[] | null | undefined,
  rooms: Room[] | null | undefined
}

const formOptions = reactive({
  courses: null,
  instructors: null,
  buildings: null,
  rooms: null
}) as FormData


onMounted(async () => {
  formOptions.courses = await fetchCourses();
  formOptions.instructors = await fetchInstructors();
  formOptions.buildings = await fetchBuildings()
});

const {courses, instructors, buildings} = toRefs(formOptions)

const addSection = () => {
  console.log('added section');
};

const test = ref(0)

</script>

<template>
  <form id="course-scheduler" @submit.prevent="addSection">
    <!-- passes select method down as prop because search field and search field item share the same context -->
    <search-field
      v-model="test"
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
        v-if="buildings"
        v-slot="{ item, select }"
        :placeholder="'Buildings'"
        :items="buildings"
        :filter="'building_number'"
        :id="'building_id'"
        :icon="'chalkboard-teacher'"
      >
        <search-field-item
          :name="`Building ${item.building_number}`"
          :meta="item.building_name"
          @mousedown="select(item.building_id, item.building_number)"
        ></search-field-item>
      </search-field>


      <search-field
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


    <day-picker></day-picker>
    <input type="submit" value="Submit" />
    <p>{{test}}</p>
  </form>
</template>
