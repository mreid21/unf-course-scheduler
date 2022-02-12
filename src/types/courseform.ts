import Building from './building';
import Course from './course';
import Instructor from './professor';
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

type CourseForm = {
  course: Option;
  instructor: Option;
  campus: Option;
  building?: Option;
  room?: Option;
  slot: Option;
};

export { FormOptions, CourseForm };
