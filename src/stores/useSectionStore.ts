import { defineStore } from 'pinia'
import useDatabase from '../composables/useDatabase'
import { Section } from '../types/section'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
const {fetchSections} = useDatabase()

export const useSectionStore = defineStore('section', {
  state: () => {
      return {
          sections: [] as Section[] | null | undefined
      }
  },
  actions: {
    async getSections(){
      const result = await fetchSections()
      if(result){
        this.$patch({
          sections: result
        })
      }
    }
  }
})
