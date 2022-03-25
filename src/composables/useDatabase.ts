import { supabase } from '../supabase';
import AsyncFn from '../types/asyncFn';
import Building from '../types/building';
import Course from '../types/course';
import Instructor from '../types/instructor';
import Room from '../types/room';
import { Section, SectionBuilder } from '../types/section';
import TimeSlot from '../types/timeSlot';

const useDatabase = () => {
  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from<Course>('courses')
        .select('*');

      if (error) throw error;

      return data;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchInstructors = async () => {
    try {
      const { data, error } = await supabase
        .from<Instructor>('instructors')
        .select('*');

      if (error) throw error;

      return data;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchBuildings = async () => {
    try {
      const { data, error } = await supabase
        .from<Building>('buildings')
        .select('*');

      if (error) throw error;

      return data;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchRooms = async (buildingID: number) => {
    try {
      const { data, error } = await supabase
        .from<Room>('rooms')
        .select('*')
        .eq('building_id', buildingID);

      if (error) throw error;

      return data;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchTimeSlots = async (day: string, credits: number) => {
    try {
      const { data, error } = await supabase
        .from<TimeSlot>('time_slots')
        .select('*')
        .eq('slot_days', day)
        .eq('credits', credits)
        .order('begin_time', { ascending: true });

      if (error) throw error;

      return data;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from<Section>('all_courses')
        .select('*')
        .order('section_id', { ascending: true });

      if (error) throw error;

      return data;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const insertSection = async (section: Object) => {
    try {
      const { error } = await supabase.from('sections').insert(section);

      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const deleteSection = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from('sections')
        .delete()
        .match({ section_id: id });

      if (error) throw error;

      return data;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const updateSection = async (section: SectionBuilder) => {

    let withNulls: any = {...section}
    for(let prop in withNulls){
      if(withNulls[prop] === undefined) withNulls[prop] = null
    }
    console.log(withNulls)
    try {
      const { data, error } = await supabase
        .from('sections')
        .update({
          course_id: withNulls.course_id,
          instructor_id: withNulls.instructor_id,
          room_id: withNulls.room_id,
          campus_id: withNulls.campus_id,
          slot_id: withNulls.slot_id,
        })
        .match({ section_id: section.section_id });

      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const fetchParallel = async (resources: AsyncFn[]) => {
    const calls = resources.map((fn) => fn());
    return await Promise.all(calls);
  };

  return {
    fetchCourses,
    fetchInstructors,
    fetchBuildings,
    fetchRooms,
    fetchTimeSlots,
    fetchParallel,
    fetchSections,
    deleteSection,
    insertSection,
    updateSection,
  };
};

export default useDatabase;
