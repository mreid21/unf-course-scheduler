import { computed, reactive, ref, watch, watchEffect } from 'vue';
import { CourseForm } from '../types/courseForm';
import { useCourseStore } from '../stores/useCourseStore';
import { useSectionStore } from '../stores/useSectionStore';
import useValidation from './useValidation';
import useDatabase from './useDatabase';
import { SectionBuilder } from '../types/section';

const useForm = () => {
  const courseStore = useCourseStore();
  const sectionStore = useSectionStore();
  const {insertSection} = useDatabase()
  const form = reactive({}) as CourseForm;
  const conflicts = ref()
  const { findConflicts } = useValidation(form);

  const populateWith = (state: CourseForm) => {
    Object.assign(form, state);
  };

  const updateRooms = async () => {
    if (form.building) {
      await courseStore.getRooms(form.building.id);
    } else {
      form.room = undefined;
      courseStore.rooms = [];
    }
  };

  const updateTimeSlots = async () => {
    if (form.day && form.course) {
      await courseStore.getTimeSlots(form.day, form.course.meta as number);
    } else {
      form.slot = undefined;
      courseStore.timeSlots = [];
    }
  };

  const submit = (action: string) => {
    conflicts.value = findConflicts();
    const section: SectionBuilder = {
      section_id: form.sectionID,
      course_id: form.course!.id,
      instructor_id: form.instructor!.id,
      campus_id: form.campus!,
      room_id: form.room?.id,
      slot_id: form.slot!.id,
    }
    if(conflicts.value.length > 0) return
    switch(action){
      case 'add':
        insertSection(section)
        break;
      case 'save':
        break;
    }
  };

  const clearConflicts = () => conflicts.value = undefined

  const clearForm = () => {
    for (let field in form) {
      if (field !== 'campus' && field !== 'day') {
        form[field as keyof CourseForm] = undefined;
      }
    }
    sectionStore.stopEditing();
  };

  watch(
    () => form.building,
    () => updateRooms()
  );
  watch([() => form.day, () => form.course], () => updateTimeSlots());

  const isEditing = computed(() => sectionStore.isEditing);

  watchEffect(() => {
    if (sectionStore.sectionEdit) {
      populateWith(sectionStore.sectionEdit);
    }
  });

  sectionStore.$onAction(({ name }) => {
    if (name === 'deleteSection') {
      clearForm();
    }
  });

  return {
    form,
    clearForm,
    isEditing,
    submit,
    conflicts,
    clearConflicts
  };
};

export default useForm;
