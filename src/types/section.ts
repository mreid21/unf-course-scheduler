type SectionField = keyof Section;

interface Section {
  section_id: number;
  course_code: string;
  credit_hours: number;
  instructor_name: string;
  room_number?: string;
  building_number?: string;
  building_name?: string;
  campus_name: string;
}

type SectionBuilder = {
  course_id: number,
  instructor_id: number,
  room_id?: number,
  campus_id: number,
  slot_id: number,
  building_id?: number
}


export {
  SectionField,
  Section,
  SectionBuilder
}
