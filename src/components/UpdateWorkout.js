import { useState } from "react"
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const UpdateWorkout = ({wTitle,wLoad,wReps,wId,handleFormVisibility}) =>{
    // const {dispatch} = useWorkoutsContext();
    const [title,setTitle] = useState(wTitle);
    const [load,setLoad] = useState(wLoad);
    const [reps,setReps] = useState(wReps);
    const [error,setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const {user} = useAuthContext();

    if(!user){
        return
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const workout = {title,reps,load};
        const response = await fetch('/workouts/' + wId,{
            method:"PATCH",
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        });
        const json = await response.json()

        if (!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok){
            setError(null);
            setEmptyFields([]);
            console.log("New Workout is added:",json);
            handleFormVisibility();
        }
    }

    return(
            <form className="create update" onSubmit={handleSubmit}>
                <h3>Update Workout</h3>
                <label>Exercise Title:</label>
                <input 
                    type="text"
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes("title") ? "error" : ""}
                />
                <label>Load:</label>
                <input 
                    type="number"
                    onChange={(e)=>setLoad(e.target.value)}
                    value={load}
                    className={emptyFields.includes("load") ? "error" : ""}
                />
                <label>Reps:</label>
                <input 
                    type="number"
                    onChange={(e)=>setReps(e.target.value)}
                    value={reps}
                    className={emptyFields.includes("reps") ? "error" : ""}
                />
                <button>Update Workout</button>
                {error && <div className="error">{error}</div> }
            </form>
    )
}
