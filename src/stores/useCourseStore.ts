import { defineStore } from 'pinia'
import useDatabase from '../composables/useDatabase'
import AsyncFn from '../types/asyncFn'
import Room from '../types/room'
import TimeSlot from '../types/timeSlot'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const {fetchRooms, fetchTimeSlots, fetchParallel} = useDatabase()

export const useCourseStore = defineStore('courses', {
  state: () => {
      return {
        courses: [], 
        instructors: [],
        buildings: [],
        rooms: [] as Room[],
        timeSlots: [] as TimeSlot[]
      }
  },
  
  actions: {
    async getFieldData(query: AsyncFn[]) {
        return await fetchParallel(query)
    },
    async getRooms(buildingID: number){
        this.rooms = []
        const rooms = await fetchRooms(buildingID)
        if(rooms)this.rooms = rooms
        
    },
    async getTimeSlots(days: string, credits: number){
        this.timeSlots = []
        const slots = await fetchTimeSlots(days, credits)
        if(slots) this.timeSlots = slots
    }
  }
})
