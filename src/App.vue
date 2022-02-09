<script setup lang="ts">
import CourseScheduler from './components/CourseScheduler.vue';
</script>

<template>
  <div class="lg:h-screen bg-gray-50">
    <div class="app-container">
      <main class="p-4 bg-white border-b-2 border-gray-100 lg:col-span-5">
        <nav>NAVIGATION</nav>
        <course-scheduler></course-scheduler>
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
