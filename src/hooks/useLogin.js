import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useLogin = ()=>{
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async(email,password)=>{
        setError(null);
        setIsLoading(true);

        const response = await fetch('/user/login',{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{"Content-Type":"Application/json"}
        });
        const json = await response.json();

        if (!response.ok){
            setError(json.error);
            setIsLoading(false);
        }

        if (response.ok){
            setError(null);
            setIsLoading(false);
            // save user data to local storage
            localStorage.setItem("user",JSON.stringify(json));
            // save data to global context
            dispatch({type:'LOGIN',payload:json})

            return true;
        }
    }
    return {error,isLoading,login}
}