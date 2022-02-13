import Building from './building';
import Course from './course';
import Instructor from './instructor';
import Room from './room';
import TimeSlot from './timeslot';
import Option from './option';

interface FormOptions {
  courses: Course[] | null | undefined;
  instructors: Instructor[] | null | undefined;
  buildings: Building[] | null | undefined;
  rooms: Room[] | null | undefined;
  timeSlots: TimeSlot[] | null | undefined;
}

type DayOfWeek = 'MWF' | 'MW' | 'TR' | 'M' | 'T' | 'W' | 'R' | 'F';

type CourseForm = {
  course: Option | undefined;
  instructor: Option | undefined;
  campus: Option | undefined;
  day: DayOfWeek | undefined;
  building?: Option | undefined;
  room?: Option | undefined;
  slot: Option | undefined;
};

export { FormOptions, CourseForm, DayOfWeek };
