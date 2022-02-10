export type SectionField = keyof Section;

export interface Section {
  section_id: number;
  course_code: string;
  credit_hours: number;
  instructor_name: string;
  room_number?: string;
  building_number?: string;
  building_name?: string;
  campus_name: string;
}
