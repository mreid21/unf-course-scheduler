import { defineStore } from 'pinia';
import useDatabase from '../composables/useDatabase';
import { CourseForm } from '../types/courseform';
import { Section, SectionBuilder } from '../types/section';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const { fetchSections, fetchSection } = useDatabase();

export const useSectionStore = defineStore('section', {
  state: () => ({
      sections: [] as Section[],
      sectionEdit: {} as CourseForm | undefined
  }),
  actions: {
    async getSections() {
      const result = await fetchSections();
      if (result) this.sections = result;
    },
    findSectionByID(id: number){
      return this.sections.find(section => section.section_id === id)
    },
    async editSection(id: number){
      if(this.$state.sectionEdit && id === this.$state.sectionEdit.sectionID){
        return
      }
    
      const section = this.findSectionByID(id)
      const sectionMeta: SectionBuilder | undefined = await fetchSection(id)

      if(section && sectionMeta){
        this.$state.sectionEdit = {
          sectionID: section.section_id,
          course: {id: sectionMeta.course_id, value: section.course_code},
          instructor: {id: sectionMeta.instructor_id, value: section.instructor_name},
          campus: {id: sectionMeta.campus_id, value :section.campus_name},
          slot: {id: sectionMeta.slot_id, value: `${section.begin_time} - ${section.end_time}`}
        }
        if(sectionMeta.building_id && section.building_number) this.$state.sectionEdit.building = {id: sectionMeta.building_id, value: section.building_number as string}
        if(sectionMeta.room_id && section.room_number) this.$state.sectionEdit.building = {id: sectionMeta.room_id, value: section.room_number as string}
      }
    },
  },
});
