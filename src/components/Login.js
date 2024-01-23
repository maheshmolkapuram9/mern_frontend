import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {error, isLoading, login} = useLogin();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const verify = await login(email,password);
        if (verify){
            setEmail("");
            setPassword("");
        }
    }
    
    return(
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email</label>
            <input 
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                required
            />
            <label>Password</label>
            <input 
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                required
            />
            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;