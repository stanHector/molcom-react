import { createContext } from 'react'

export const Auth = createContext({
    isLoggedIn: false,
    
    updateUser:()=>{},
    logout: ()=>{}
})