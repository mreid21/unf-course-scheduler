import { supabase } from '../supabase';
import Building from '../types/building';
import Course from '../types/course';
import Instructor from '../types/professor';
import Room from '../types/room';
import TimeSlot from '../types/timeslot';

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

  const fetchTimeSlots = async (day: string) => {
    try {
      const { data, error } = await supabase
        .from<TimeSlot>('time_slots')
        .select('*')
        .eq('slot_days', day)
        .order('begin_time', { ascending: true });

      if (error) throw error;

      return data;
    } catch (error: any) {
      alert(error.message);
    }
  };

  interface AsyncFn {
    (args?: any): Promise<any>;
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
    fetchParallel,
  };
};

export default useDatabase;
