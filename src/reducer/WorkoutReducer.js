export const WorkoutReducer = (state,action) =>{
    switch(action.type){
        case 'GET_WORKOUTS':
            return {
                workouts : action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts : [action.payload, ...state.workouts]
            }
        case 'GET_WORKOUT':
            return{
                workouts : action.payload
            }
        case 'DELETE_WORKOUT':
            return {
                workouts : state.workouts.filter(
                    workout => workout._id !== action.payload._id
                )
            }
        default:
            return state
    }
}