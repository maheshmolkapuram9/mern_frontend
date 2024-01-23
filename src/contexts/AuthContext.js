import { AuthReducer } from "../reducer/AuthReducer";
import { useReducer,createContext,useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,{user:null});

    useEffect(()=>{
        const user = localStorage.getItem("user");
        if (user){
            dispatch({type:'LOGIN',payload:JSON.parse(user)})
        }
    },[])

    console.log("AuthContext: ",state);

    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}