import { DayOfWeek } from './courseForm';

type SectionField = keyof Section;

type Section = SectionData & SectionBuilder;

type SectionData = {
  section_id: number;
  course_code: string;
  course_title?: string;
  credit_hours: number;
  instructor_name: string;
  room_number?: string | number;
  building_number?: string | number;
  building_name?: string;
  begin_time: string;
  slot_days: DayOfWeek;
  end_time: string;
  campus_name: string;
};

type SectionBuilder = {
  section_id?: number;
  course_id: number;
  instructor_id: number;
  room_id?: number;
  campus_id: number;
  slot_id: number;
  building_id?: number;
};

export { SectionField, Section, SectionBuilder };
