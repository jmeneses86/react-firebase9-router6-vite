import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { UserContext } from "./context/UserProvider";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Perfil from "./routes/Perfil";

import Navbar from "./components/Navbar";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import LayoutContainerForm from "./components/layouts/LayoutContainerForm";
import NotFound from "./routes/NotFound";

const App = () => {
    const { user } = useContext(UserContext);

    if (user === false) {
        return <p>Loading. . .</p>;
    }

    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route
                    path="/"
                    element={<LayoutRequireAuth></LayoutRequireAuth>}
                >
                    <Route index element={<Home></Home>}></Route>
                    <Route path="/perfil" element={<Perfil></Perfil>}></Route>
                </Route>

                <Route
                    path="/"
                    element={<LayoutContainerForm></LayoutContainerForm>}
                >
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route
                        path="/register"
                        element={<Register></Register>}
                    ></Route>
                </Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </>
    );
};

export default App;
