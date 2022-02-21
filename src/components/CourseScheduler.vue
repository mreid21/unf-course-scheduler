<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import useDatabase from '../composables/useDatabase';
import options from '../assets/campusoptions';
import RadioGroup from './RadioGroup.vue';
import SearchField from './SearchField.vue';
import { SectionBuilder } from '../types/section';
import SearchFieldItem from './SearchFieldItem.vue';
import DayPicker from './DayPicker.vue';
import SlotPicker from './SlotPicker.vue';
import { useCourseStore } from '../stores/useCourseStore';
import useForm from '../composables/useForm';

const { fetchCourses, fetchInstructors, fetchBuildings } = useDatabase();

const store = useCourseStore();
const { form, updateRooms, updateTimeSlots, clearForm } = useForm();

const { mode, section } = defineProps<{
  mode: 'edit' | 'create';
  section?: SectionBuilder;
}>();

const modeIsCreate = ref<boolean>(mode === 'create');

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

watch(
  () => form.building,
  () => updateRooms()
);
watch([() => form.day, () => form.course], () => updateTimeSlots());

const submit = () => {
  mode === 'create'
    ? console.log('created section ' + mode)
    : console.log('edited section');
};
</script>

<template>
  <form id="course-scheduler" @submit.prevent="submit">
    <!-- passes select method down as prop because search field and search field item share the same context -->
    <search-field
      v-model="form.course"
      v-if="store.courses.length > 0"
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
      v-model="form.instructor"
      v-if="store.instructors.length > 0"
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

    <radio-group v-model="form.campus" :fields="options"></radio-group>

    <search-field
      v-model="form.building"
      v-if="store.buildings.length > 0"
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
      v-model="form.room"
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

    <day-picker v-model="form.day"></day-picker>

    <slot-picker
      v-if="store.timeSlots.length > 0"
      v-model="form.slot"
      :timeSlots="store.timeSlots"
    ></slot-picker>

    <div class="lg:flex">
      <input
        :class="[modeIsCreate ? 'btn btn--confirm' : 'btn btn--edit']"
        type="submit"
        :value="modeIsCreate ? 'Add' : 'Save'"
      />
      <input
        @click="clearForm"
        type="button"
        value="Clear"
        class="btn btn--reject"
      />
    </div>
  </form>
  <p>{{ form }}</p>
</template>
