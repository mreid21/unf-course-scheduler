import { supabase } from '../supabase';
import Building from '../types/building';
import Course from '../types/course';
import Instructor from '../types/professor';
import Room from '../types/room';

const useSupabase = () => {
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
      const { data, error } = await supabase.from<Room>('rooms').select('*').eq('building_id', buildingID)

      if (error) throw error;

      return data;
    } catch (error: any) {
      alert(error.message);
    }
  };

  return {
    fetchCourses,
    fetchInstructors,
    fetchBuildings,
    fetchRooms,
  };
};

export default useSupabase;
