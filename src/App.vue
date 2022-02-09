<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SearchField from './components/SearchField.vue';
import { supabase } from './supabase';
import Course from './types/course';
import SearchFieldItem from './components/SearchFieldItem.vue';
import Instructor from './types/professor';
import RadioGroup from './components/RadioGroup.vue';
import options from './assets/campusoptions';

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
</script>

<template>
  <div class="lg:h-screen bg-gray-50">
    <div class="app-container">
      <main class="p-4 bg-white border-b-2 border-gray-100 lg:col-span-5">
        <nav>NAVIGATION</nav>
      </main>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
