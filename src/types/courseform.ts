import Building from './building';
import Course from './course';
import Instructor from './instructor';
import Room from './room';
import TimeSlot from './timeSlot';
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
  course?: Option
  instructor?: Option
  campus?: Option
  day?: DayOfWeek
  building?: Option
  room?: Option
  slot?: Option
};

export { FormOptions, CourseForm, DayOfWeek };
