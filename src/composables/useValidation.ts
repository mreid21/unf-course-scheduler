import { ref } from 'vue';
import { useSectionStore } from '../stores/useSectionStore';
import { CourseForm } from '../types/courseForm';
import useTime from './useTime';

type SectionLike = {
  section_id?: number;
  start: string;
  end: string;
};

const useValidation = (form: CourseForm) => {
  const store = useSectionStore();
  const { timeToInt } = useTime();
  const data = ref<CourseForm>(form);

  

  const findConflicts = () => {
    const byInstructor = store.sectionWithInstructor(
      data.value.instructor!.id,
      data.value.sectionID
    );
    const byRoom = store.sectionInRoom(
      data.value.room!.id,
      data.value.sectionID
    );
    const potentialConflicts = new Set([...byInstructor, ...byRoom]);

    let conflicts = []

    const potentialSection: SectionLike = {
      start: data.value.slot!.meta.start,
      end: data.value.slot!.meta.end,
    };
    const simple: SectionLike[] = [...potentialConflicts].map((c) => ({
      section_id: c.section_id,
      start: c.begin_time,
      end: c.end_time,
    }));
    const sorted = [...simple, potentialSection].sort(
      (a, b) => timeToInt(a.start) - timeToInt(b.start)
    );

    const position = sorted.indexOf(potentialSection)

    //first pass: check all sections before potential
    for(let i = 0; i < position; i++){
      if(potentialSection.start < sorted[i].end){
        conflicts.push(sorted[i])
      }
    }

    //second pass: check all sections after potential
    for(let i = position; i < sorted.length; i++){
      if(sorted[i].start < potentialSection.end && i !== position){
        conflicts.push(sorted[i])
      }
    }
  };

  return {
    findConflicts
  };
};

export default useValidation;
