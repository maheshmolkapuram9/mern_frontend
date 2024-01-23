import { useEffect,useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams} from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {UpdateWorkout} from "./UpdateWorkout";

function SingleWorkout(){
  // fetching workout details
  const [workout,setWorkout] = useState(null);
  const {user} = useAuthContext();
  const {workout_id} = useParams(); 
  const [isFormVisible,setIsFormVisible] = useState(false);

  useEffect(()=>{
    const fetchWorkout = async() =>{
      
      try{
        const response = await fetch("https://mern-backend-ohuj.onrender.com/workouts/" + workout_id,{
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        });
        if (response.ok){
            const json = await response.json();
            setWorkout(json);
        }   
      } catch (error) {
        console.error("Error fetching workout:", error);
      };
    }

    if(user){
      fetchWorkout();
    }
  },[user,workout_id,workout]);

  const handleEdit = ()=>{
    setIsFormVisible(!isFormVisible);
  }

    return(
      <>
        {workout && (
          <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
            <span onClick={handleEdit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3c73e2" viewBox="0 0 256 256"><path d="M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z" opacity="0.2"></path><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path></svg>
            </span>
          </div>
        )}
        {isFormVisible && 
          <UpdateWorkout 
            wTitle={workout.title}
            wLoad={workout.load}
            wReps={workout.reps}
            wId={workout_id}
            handleFormVisibility={handleEdit}
          />
        }
      </>
    )
}

export default SingleWorkout;
