import { supabase } from '../supabase';
import AsyncFn from '../types/asyncFn';
import Building from '../types/building';
import Course from '../types/course';
import Instructor from '../types/instructor';
import Room from '../types/room';
import { Section, SectionBuilder } from '../types/section';
import TimeSlot from '../types/timeSlot';
import {useUserStore} from '../stores/useUserStore'

const useDatabase = () => {
  const store = useUserStore()
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
        .from('all_courses')
        .select('*')
        .eq('schedule_id', store.planID)
        .order('section_id', { ascending: true });

      if (error) throw error;

      return data;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const insertSection = async (section: Object) => {
    const withScheduleID = {...section, schedule_id: store.planID}
    try {
      const { error } = await supabase.from('sections').insert(withScheduleID);

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


  const fetchSchedules = async (userID: string) => {
    try {
      const {data, error} = await supabase
            .from('schedules')
            .select('*')
            .eq('user_id', userID)
      
      if(error) throw error

      return data
    }
    catch(error: any){
      console.error(error.message)
    }
  }

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
    fetchSchedules,
    fetchParallel,
    fetchSections,
    deleteSection,
    insertSection,
    updateSection,
  };
};

export default useDatabase;
