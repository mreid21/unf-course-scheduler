import {defineStore} from 'pinia'
import {User} from '@supabase/supabase-js'


export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        planID: null as number | null
    }),
    actions: {
        setCurrentPlan(id: number){
            this.$state.planID = id
        }
    }
})