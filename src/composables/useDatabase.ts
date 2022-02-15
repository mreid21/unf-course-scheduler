import { supabase } from '../supabase';
import AsyncFn from '../types/asyncFn';
import Building from '../types/building';
import Course from '../types/course';
import Instructor from '../types/instructor';
import Room from '../types/room';
import { Section } from '../types/section';
import TimeSlot from '../types/timeSlot';

const useDatabase = () => {
  const fetchCourses = async (): Promise<Course[] | undefined> => {
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

  const fetchInstructors = async (): Promise<Instructor[] | undefined> => {
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

  const fetchBuildings = async (): Promise<Building[] | undefined> => {
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

  const fetchRooms = async (buildingID: number): Promise<Room[] | undefined> => {
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

  const fetchTimeSlots = async (day: string, credits: number): Promise<TimeSlot[] | undefined> => {
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

  const fetchSections = async (): Promise<Section[] | undefined> => {
    try {
      const { data, error } = await supabase
        .from<Section>('all_courses')
        .select('*')
        .order('section_id', {ascending: true})

      if (error) throw error;

      return data;
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
    fetchSections
  };
};

export default useDatabase;
