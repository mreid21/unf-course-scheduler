import { defineStore } from 'pinia';
import useDatabase from '../composables/useDatabase';
import { CourseForm } from '../types/courseform';
import { Section, SectionBuilder } from '../types/section';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const { fetchSections, fetchSection, deleteSection } = useDatabase();

export const useSectionStore = defineStore('section', {
  state: () => ({
    sections: [] as Section[],
    sectionEdit: {} as CourseForm,
    isEditing: false
  }),
  actions: {
    async getSections() {
      const result = await fetchSections();
      if (result) this.sections = result;
    },
    findSectionByID(id: number) {
      return this.sections.find((section) => section.section_id === id);
    },
    stopEditing(){
      this.isEditing = false
    },
    async editSection(id: number) {
      if (this.$state.sectionEdit && id === this.$state.sectionEdit.sectionID) {
        return;
      }
      const section = this.findSectionByID(id);
      const sectionMeta = await fetchSection(id);

      if (section && sectionMeta) {
        

        let model = {
          course: {id: sectionMeta.section_id, value: section.course_code, meta: section.credit_hours as number},
          instructor: {id: sectionMeta.section_id, value: section.instructor_name},
          campus: {id: sectionMeta.campus_id, value: section.campus_name},
          slot: {id: sectionMeta.slot_id, value: `${section.begin_time} - ${section.end_time}`},
          day: section.slot_days,
        } as CourseForm

        if(section.building_number && sectionMeta.building_id) model.building = {id: sectionMeta.building_id, value: `Building ${section.building_number}`}
        if(section.room_number && sectionMeta.room_id) model.room = {id: sectionMeta.room_id, value: `Room ${section.room_number}`}

        Object.assign(this.sectionEdit, model)
      }
      this.isEditing = true
    },
    async deleteSection(id: number) {
      const section = this.findSectionByID(id);
      if (section) {
        this.sections = this.sections.filter(
          (section) => section.section_id !== id
        );
        await deleteSection(id);
      }
    },
  },
});
