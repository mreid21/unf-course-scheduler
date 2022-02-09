<script setup lang="ts">
import useSupabase from '../composables/useSupabase'
import { onMounted, ref } from 'vue';
import options from '../assets/campusoptions';
import Course from '../types/course';
import Instructor from '../types/professor';
import RadioGroup from './RadioGroup.vue';
import SearchField from './SearchField.vue';
import SearchFieldItem from './SearchFieldItem.vue';
import DayPicker from './DayPicker.vue';

const courses = ref<Course[] | null | undefined>(null);
const instructors = ref<Instructor[] | null | undefined>(null);
const {fetchCourses, fetchInstructors} = useSupabase()

onMounted(async () => {
  courses.value = await fetchCourses();
  instructors.value = await fetchInstructors();
});

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

    <div class="xl:flex gap-2">
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
    </div>


    <day-picker></day-picker>
    <input type="submit" value="Submit" />
    <p>{{test}}</p>
  </form>
</template>
