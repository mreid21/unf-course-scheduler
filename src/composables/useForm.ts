import { computed, reactive, watch, watchEffect } from 'vue';
import { CourseForm } from '../types/courseForm';
import { useCourseStore } from '../stores/useCourseStore';
import { useSectionStore } from '../stores/useSectionStore';
import useValidation from './useValidation';

const useForm = () => {
  const courseStore = useCourseStore();
  const sectionStore = useSectionStore();
  const form = reactive({}) as CourseForm;
  const {findConflicts} = useValidation(form)

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

  const submit = () => {
    findConflicts()
  }

  const clearForm = () => {
    for (let field in form) {
      if(field !== 'campus' && field !== 'day'){
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
    submit
  };
};

export default useForm;
