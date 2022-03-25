import { computed, reactive, ref, watch, watchEffect } from 'vue';
import { CourseForm } from '../types/courseForm';
import { useCourseStore } from '../stores/useCourseStore';
import { useSectionStore } from '../stores/useSectionStore';
import useValidation from './useValidation';
import useTime from './useTime';
import { SectionBuilder, Section } from '../types/section';

const useForm = () => {
  const courseStore = useCourseStore();
  const sectionStore = useSectionStore();
  const { formatTime } = useTime();
  const form = reactive({}) as CourseForm;
  const conflicts = ref();
  const submitted = ref(false);
  const conflictSections = computed(() =>
    conflicts.value && conflicts.value.length > 0
      ? conflicts.value
          .map((s: any) => ({...sectionStore.findSectionByID(s.section_id), reason: s.reason}))
          .map((s: any) => ({
            ...s,
            begin_time: formatTime(s.begin_time),
            end_time: formatTime(s.end_time),
          }))
      : []
  );
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

  const modelIsValid = () => {
    if(form.course && form.instructor){
      if(form.campus && form.campus >= 3){
        return true
      }
      else if(form.building && form.room && form.slot && form.day) {
        return true
      }
      else {
        return false
      }
    }
    return false
  };

  const submit = (action: string) => {
    submitted.value = true;
    if (action === 'duplicate') form.sectionID = undefined;

    if (!modelIsValid()) {
      return;
    }

    if(form.campus === 1 || form.campus === 2) conflicts.value = findConflicts();
    const section: SectionBuilder = {
      section_id: form.sectionID,
      course_id: form.course!.id,
      instructor_id: form.instructor!.id,
      campus_id: form.campus!,
      room_id: form.room?.id,
      slot_id: form.slot?.id,
    };
    if (conflicts.value && conflicts.value.length > 0) return;

    switch (action) {
      case 'add':
        sectionStore.addSection(section);
        break;
      case 'save':
        sectionStore.updateSection(section);
        break;
      case 'duplicate':
        sectionStore.addSection(section);
    }
    if (action !== 'save') clearForm();
    submitted.value = false;
  };

  const clearConflicts = () => (conflicts.value = undefined);

  const clearForm = () => {
    for (let field in form) {
      form[field as keyof CourseForm] = undefined;
    }
    sectionStore.stopEditing();
    submitted.value = false;
  };

  watch(
    () => form.building,
    () => updateRooms()
  );
  watch([() => form.day, () => form.course], () => updateTimeSlots());

  const isEditing = computed(() => sectionStore.isEditing);
  const showErrors = computed(() =>
    submitted.value === true && !modelIsValid() ? true : false
  );

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
    conflictSections,
    clearConflicts,
    showErrors,
  };
};

export default useForm;
