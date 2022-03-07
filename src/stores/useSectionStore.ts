import { defineStore } from 'pinia';
import useDatabase from '../composables/useDatabase';
import useTime from '../composables/useTime';
import { CourseForm } from '../types/courseform';
import { Section, SectionBuilder } from '../types/section';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const { fetchSections, deleteSection, insertSection, updateSection } =
  useDatabase();
const { formatTime } = useTime();

export const useSectionStore = defineStore('section', {
  state: () => ({
    sections: [] as Section[],
    sectionEdit: {} as CourseForm,
    isEditing: false,
  }),
  getters: {
    sectionWithInstructor: (state) => {
      return (instructorID: number, sectionID?: number): Section[] | [] =>
        state.sections.filter(
          (s) => s.instructor_id === instructorID && s.section_id !== sectionID
        );
    },
    sectionInRoom: (state) => {
      return (roomID: number, sectionID?: number): Section[] | [] =>
        state.sections.filter(
          (s) => s.room_id === roomID && s.section_id !== sectionID
        );
    },
    sectionsWithoutID: (state) => {
      return state.sections.map((s: any) => {
        delete s.section_id;
        return s;
      });
    },
    sectionsWithFormattedTime: (state) =>
      state.sections.map((s) => {
        return {
          ...s,
          begin_time: formatTime(s.begin_time),
          end_time: formatTime(s.end_time),
        };
      }),
  },
  actions: {
    async getSections() {
      const result = await fetchSections();
      if (result) this.sections = result;
    },
    findSectionByID(id: number) {
      return this.sections.find((section) => section.section_id === id);
    },
    findSectionsOnDays(
      dayCode: string,
      sections: Section[],
      sectionID?: number
    ) {
      const days = dayCode.split('');
      return sections.filter(
        (s) =>
          days.some((d) => s.slot_days.includes(d)) &&
          s.section_id !== sectionID
      );
    },
    stopEditing() {
      this.sectionEdit = {};
      this.isEditing = false;
    },
    async editSection(id: number) {
      if (this.$state.sectionEdit && id === this.$state.sectionEdit.sectionID) {
        return;
      }
      const section = this.findSectionByID(id);
      if (section) {
        this.sectionEdit = {
          sectionID: section.section_id,
          course: {
            id: section.course_id,
            value: section.course_code,
            meta: section.credit_hours as number,
          },
          instructor: {
            id: section.instructor_id,
            value: section.instructor_name,
          },
          campus: section.campus_id,
          day: section.slot_days,
          slot: {
            id: section.slot_id,
            value: `${section.begin_time} - ${section.end_time}`,
            meta: {
              start: section.begin_time,
              end: section.end_time,
            },
          },
        };

        if (section.building_id && section.building_number)
          this.sectionEdit.building = {
            id: section.building_id,
            value: `Building ${section.building_number}`,
          };
        if (section.room_id && section.room_number)
          this.sectionEdit.room = {
            id: section.room_id,
            value: `Room ${section.room_number}`,
          };

        this.isEditing = true;
      }
    },
    async deleteSection(id: number) {
      if (this.isEditing) this.isEditing = false;
      const section = this.findSectionByID(id);
      if (section) {
        this.sections = this.sections.filter(
          (section) => section.section_id !== id
        );

        await deleteSection(id);
      }
    },
    async addSection(section: SectionBuilder) {
      if (this.isEditing) this.isEditing = false;
      await insertSection(section);
      await this.getSections();
    },
    async updateSection(section: SectionBuilder) {
      await updateSection(section);
      await this.getSections();
    },
  },
});
