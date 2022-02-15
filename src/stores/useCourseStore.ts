import { defineStore } from 'pinia'
import useDatabase from '../composables/useDatabase'
import AsyncFn from '../types/asyncFn'
import Course from '../types/course'
import Instructor from '../types/instructor'
import { Section } from '../types/section'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const {fetchRooms, fetchTimeSlots, fetchParallel} = useDatabase()

export const useCourseStore = defineStore('courses', {
  state: () => {
      return {
        courses: [], 
        instructors: [],
        buildings: [],
        rooms: [],
        timeSlots: []
      }
  },
  actions: {
    async getFieldData(query: AsyncFn[]) {
        return await fetchParallel(query)
    },
    async getRooms(buildingID: number){
        return await fetchRooms(buildingID)
    },
    async getTimeSlots(days: string, credits: number){
        return await fetchTimeSlots(days, credits)
    }
  }
})
