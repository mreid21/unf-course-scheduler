import { supabase } from "../supabase";
import Course from '../types/course';
import Instructor from '../types/professor';

const useSupabase = () => {
    const fetchCourses = async () => {
        try {
          const { data, error } = await supabase.from<Course>('courses').select('*');
      
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

      return {
          fetchCourses,
          fetchInstructors
      }
}

export default useSupabase