import { useReducer,createContext } from "react";
import { WorkoutReducer } from "../reducer/WorkoutReducer";

export const WorkoutContext = createContext();

export const WorkoutContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(WorkoutReducer,{workouts:null});

    return(
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}