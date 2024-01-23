import { useState } from "react"
import { useAuthContext } from "./useAuthContext";

export const useSignup = () =>{
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async(email,password) =>{
        setError(null);
        setIsLoading(true);

        const response = await fetch('/user/signup',{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{"Content-Type":"application/json"}
        });
        const json = await response.json();

        if (!response.ok){
            setError(json.error);
            console.log(error);
            setIsLoading(false);
        }

        if (response.ok){
            // add data to local storage
            localStorage.setItem("user", JSON.stringify(json));

            // add data to global context
            dispatch({type:"LOGIN", payload:json})

            setIsLoading(false);
            setError(null);
            return true
        }
    }

    return {error,isLoading,signup}
}