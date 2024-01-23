import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar(){
    const {logout} = useLogout();
    const {user} = useAuthContext();
    console.log(user)

    const handleClick = ()=>{
        logout();
    }

    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1 className="title">Workout  Buddy</h1>
                </Link>
                <nav>
                    { user && (
                        <div>
                            <span className="user">{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/signup">Signup</Link>
                            <Link to="/login">Login</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;