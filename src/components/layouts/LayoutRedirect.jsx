import { Outlet, useParams } from "react-router-dom";
import useFirestore from "../../hooks/useFirestore";
import { useEffect, useState } from "react";
import Title from "../Title";

const LayoutRedirect = () => {
    const { nanoId } = useParams();
    const { searchData } = useFirestore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        searchData(nanoId).then((docSnap) => {
            if (docSnap.exists()) {
                window.location.href = docSnap.data().origin;
            } else {
                setLoading(false);
            }
        });
    }, []);

    if (loading)
        return <Title text={"Cargando Redireccionamiento. . ."}></Title>;

    return (
        <div className="mx-auto container">
            <Outlet></Outlet>
        </div>
    );
};

export default LayoutRedirect;
