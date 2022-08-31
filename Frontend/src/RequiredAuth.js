import { useAuth } from "./auth"
import { Navigate } from "react-router-dom"

export const RequireAuthUser = ({children}) =>{
    const auth = useAuth()

    if(!auth.user){
return <Navigate to="/userlogin"/>
    }
    
    return children
}

export const RequireAuthAdmin = ({children}) =>{
    const auth = useAuth()

    if(!auth.user){
return <Navigate to="/adminlogin"/>
    }
    
    return children
}