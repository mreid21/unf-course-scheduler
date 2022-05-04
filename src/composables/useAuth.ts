import {supabase} from '../supabase'
import {User} from '@supabase/supabase-js'
import {useUserStore} from '../stores/useUserStore'
import AppUser from '../types/AppUser'

export const useAuth = () => {
    const store = useUserStore()

    const getUser = () => {
        store.user = supabase.auth.user();
        console.log(store.user)
    }

    const signUp = async (userData: AppUser): Promise<void> => {
        const meta = {
            username: userData.username,
            email: userData.email,
            department_id: userData.department_id
        }

        try {
            const {user, error} = await supabase.auth.signUp({email: userData.email, password: userData.password}, {data: {...meta}})

            if(error) throw error
            store.user = user
            createProfile(meta)
            
            
        }
        catch(error: any) {
            return error.message
        }
    }

    const createProfile = async (meta: Object) => {
        const id = store.user!.id

        try {
            
            let {error} = await supabase.from('user_profiles').upsert({...meta, id})

            if(error) throw error
        }
        catch(error: any){
            return error.message
        }
    }

    const signIn = async (email: string, password: string): Promise<void | string> => {
        try {
            const {user, error} = await supabase.auth.signIn({email, password})
            store.user = user

            if(error) throw error
        }

        catch(error: any) {
            return error.message
        }
    }

    const signOut = async (): Promise<void> => {
        try {
            const {error} = await supabase.auth.signOut()

            if(error) throw error

            store.user = null
        }
        catch(error: any){
            console.error(error.message)
        }
    }
    return {
        signIn,
        signOut,
        signUp,
        getUser
    }
}