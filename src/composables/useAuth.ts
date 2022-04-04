import {supabase} from '../supabase'
import {useUserStore} from '../stores/useUserStore'

export const useAuth = () => {
    const store = useUserStore()

    const signUp = async (email: string, password: string): Promise<void> => {
        try {
            const {user, error} = await supabase.auth.signUp({email, password})

            if(error) throw error
            console.log(store.user)
            
        }
        catch(error: any) {
            console.error(error.message)
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
        }
        catch(error: any){
            console.error(error.message)
        }
    }
    return {
        signIn,
        signOut,
        signUp
    }
}