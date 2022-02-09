export type SectionField =
  | 'section_id'
  | 'course_code'
  | 'credit_hours'
  | 'instructor_name'
  | 'room_number'
  | 'buidling_number'
  | 'building_name'
  | 'campus_name';

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
