<script setup lang="ts">
import { supabase } from '../supabase';
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

onMounted(async () => {
  courses.value = await fetchCourses();
  instructors.value = await fetchInstructors();
});

const fetchCourses = async () => {
  try {
    const { data, error } = await supabase.from<Course>('courses').select('*');

    if (error) throw error;

    return data;
  } catch (error: any) {
    alert(error.message);
  }
};

const fetchInstructors = async () => {
  try {
    const { data, error } = await supabase
      .from<Instructor>('instructors')
      .select('*');

    if (error) throw error;

    return data;
  } catch (error: any) {
    alert(error.message);
  }
};

const addSection = () => {
  console.log('added section');
};
</script>

<template>
  <form id="course-scheduler" @submit.prevent="addSection">
    <search-field
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
  </form>
</template>
