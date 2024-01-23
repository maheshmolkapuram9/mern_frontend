import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./components/Navbar";
import SingleWorkout from "./components/SingleWorkout";


function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path="/signup" 
              element={!user? <Signup/> : <Navigate to="/" />} 
            />
            <Route 
              path="/login" 
              element={!user? <Login /> : <Navigate to="/" />} 
            />
            <Route
              path="/:workout_id"
              element={<SingleWorkout/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
