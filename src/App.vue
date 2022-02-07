<script setup lang="ts">
import { onMounted, ref } from "vue";
import SearchField from "./components/utils/SearchField.vue";
import { supabase } from "./supabase";
import Course from "./types/course";
import SearchFieldItem from "./components/utils/SearchFieldItem.vue";
import Instructor from "./types/professor";

const courses = ref<Course[] | null | undefined>(null);
const instructors = ref<Instructor[] | null | undefined>(null);

onMounted(async () => {
  courses.value = await fetchCourses();
  instructors.value = await fetchInstructors();
});

const fetchCourses = async () => {
  try {
    const { data, error } = await supabase.from<Course>("courses").select("*");

    if (error) throw error;

    return data;
  } catch (error: any) {
    alert(error.message);
  }
};

const fetchInstructors = async () => {
  try {
    const { data, error } = await supabase
      .from<Instructor>("instructors")
      .select("*");
    console.log(data);

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
        <SearchField
          v-if="courses"
          v-slot="{ item, select }"
          :placeholder="'Courses'"
          :items="courses"
          :filter="'course_code'"
          :id="'course_id'"
        >
          <SearchFieldItem
            :name="item.course_code"
            :meta="item.course_title"
            @click="select(item.course_id, item.course_code)"
          ></SearchFieldItem>
        </SearchField>

        <SearchField
          v-if="instructors"
          v-slot="{ item, select }"
          :placeholder="'Instructors'"
          :items="instructors"
          :filter="'instructor_name'"
          :id="'instructor_id'"
        >
          <SearchFieldItem
            :name="item.instructor_name"
            @click="select(item.instructor_id, item.instructor_name)"
          ></SearchFieldItem>
        </SearchField>
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
