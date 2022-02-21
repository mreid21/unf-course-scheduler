import { computed, reactive, watch } from "vue";
import { CourseForm } from "../types/courseForm";
import { useCourseStore } from "../stores/useCourseStore";



const useForm = () => {
    const store = useCourseStore()
    const form = reactive({}) as CourseForm

    const populateWith = (state: CourseForm) => {
        Object.assign(form, state)
    }

      const updateRooms = async() => {
          if(form.building) {
              await store.getRooms(form.building.id)
          }
          else {
              form.room = undefined
              store.rooms = []
          }
      }

      const updateTimeSlots = async() => {
          if(form.day && form.course){
              await store.getTimeSlots(form.day, form.course.meta as number)
          }
          else {
              form.slot = undefined
              store.timeSlots = []
          }
      }

      const clearForm = () => {
          for(let field in form){
              if(field !== 'day' && field !== 'campus'){
                  form[field as keyof CourseForm] = undefined
              }
          }
      }

    return {
        form,
        populateWith,
        updateRooms,
        updateTimeSlots,
        clearForm
    }
  };
  
  export default useForm;
  