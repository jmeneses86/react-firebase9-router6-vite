import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleClickLogin = () => {
        setUser(true);
        navigate("/");
    };

    return (
        <div>
            <h1>Login</h1>
            <h2>{user ? "En línea" : "Fuera de línea"}</h2>
            <button onClick={handleClickLogin}>Acceder</button>
        </div>
    );
};

export default Login;
