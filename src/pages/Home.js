import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

function Home(){
  // fetching workout details
  const {workouts, dispatch} = useWorkoutsContext();
  const {user} = useAuthContext();

  useEffect(()=>{
    const fetchWorkouts = async() =>{
      
      try{
        const response = await fetch('https://mern-backend-ohuj.onrender.com/workouts',{
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        });
        if (response.ok){
            const json = await response.json();
            dispatch({type:"GET_WORKOUTS", payload:json});
        }   
      } catch (error) {
        console.error("Error fetching workouts:", error);
      };
    }

    if(user){
      fetchWorkouts();
    }
  },[dispatch,user]);
    return(
        <div className="home">
            <div className="workouts">
              {workouts && workouts.map((workout)=>{
                return (
                    <>
                        <WorkoutDetails key={workout._id} workout={workout}/>
                    </>
                )
               })}
            </div>
            <WorkoutForm />
            {/* Add symbol for mobile-view */}
            <div className="addWorkout">
              <a href="#create">+</a>
            </div>
        </div>
        
    )
}

export default Home;
