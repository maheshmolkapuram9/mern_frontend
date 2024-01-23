import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () =>{
    const {dispatch} = useAuthContext();
    const {dispatch: workoutdispatch} = useWorkoutsContext();

    const logout = () =>{
        // remove user from local storage
        localStorage.removeItem("user");

        // dispatch logout action, it removes data from global
        dispatch({type:'LOGOUT'})

        // dispatch workouts from user
        workoutdispatch({type:'GET_WORKOUTS',payload: null})
    }
    return {logout}
}