<script setup lang="ts"></script>

<template>
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
</template>
