import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () =>{
    const {dispatch} = useWorkoutsContext();
    const [title,setTitle] = useState("");
    const [load,setLoad] = useState("");
    const [reps,setReps] = useState("");
    const [error,setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const {user} = useAuthContext();

    if(!user){
        return
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const workout = {title,reps,load};
        const response = await fetch('/workouts',{
            method:"POST",
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
            dispatch({type:"CREATE_WORKOUT",payload:json})
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            setEmptyFields([]);
            console.log("New Workout is added:",json);
        }
    }

    return(
            <form className="create" id="create" onSubmit={handleSubmit}>
                <h3>Add a new workout</h3>
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
                <button>Add Workout</button>
                {error && <div className="error">{error}</div> }
            </form>
    )
}

export default WorkoutForm;