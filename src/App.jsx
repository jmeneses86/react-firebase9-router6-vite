import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";

const App = () => {
    return (
        <>
            <h1>App</h1>
            <Navbar></Navbar>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home></Home>
                        </RequireAuth>
                    }
                ></Route>
                <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
        </>
    );
};

export default App;
