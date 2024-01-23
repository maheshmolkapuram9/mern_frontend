import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {Link} from "react-router-dom";


import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({workout}) =>{
    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    if(!user){
        return
    }

    const handleDelete = async()=>{
        const response = await fetch("https://mern-backend-ohuj.onrender.com/workouts/" + workout._id, {
            method:"DELETE",
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok){
            console.log(json.error);
        }
        if (response.ok){
            dispatch({type:"DELETE_WORKOUT",payload:json})
        }
    }
    return (
        <div className="workout-details" key={workout._id}>
            <Link to={`/${workout._id}`} ><h4>{workout.title}</h4></Link>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
            <span onClick={handleDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#d91243" viewBox="0 0 256 256"><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z" opacity="0.2"></path><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
            </span>
        </div>
    )
}

export default WorkoutDetails;
