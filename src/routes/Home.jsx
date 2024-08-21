import { useEffect, useState } from "react";

import useFirestore from "../hooks/useFirestore";

import Title from "../components/Title";
import Button from "../components/Button";

const Home = () => {
    const { data, error, loading, getData, addData, deleteData, updateData } =
        useFirestore();
    const [text, setText] = useState("");
    const [newOriginId, setNewOriginId] = useState();

    useEffect(() => {
        console.log("getData");
        getData();
    }, []);

    if (loading.getData) return <p>Loading. . .</p>;
    if (error) return <p>{error}</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newOriginId) {
            await updateData(newOriginId, text);
            setNewOriginId("");
            setText("");
            return;
        }
        await addData(text);
        setText("");
    };

    const handleClickDelete = async (nanoId) => {
        await deleteData(nanoId);
    };

    const handleClickEdit = async (item) => {
        setText(item.origin);
        setNewOriginId(item.nanoId);
    };

    return (
        <>
            <Title text="Home"></Title>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ej: http://bluuweb.org/"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {newOriginId ? (
                    <Button
                        type="submit"
                        text="Editar"
                        color="yellow"
                        loading={loading.updateData}
                    ></Button>
                ) : (
                    <Button
                        type="submit"
                        text="Agregar"
                        color="purple"
                        loading={loading.addData}
                    ></Button>
                )}
            </form>

            {data.map((item) => (
                <div key={item.nanoId}>
                    <p>1 {item.nanoId}</p>
                    <p>2 {item.origin}</p>
                    <p>3 {item.uid}</p>
                    <p>4 {item.enabled}</p>
                    <Button
                        type="button"
                        text="Edit"
                        color="yellow"
                        /* loading={loading.updateData} */
                        onClick={() => handleClickEdit(item)}
                    ></Button>
                    <Button
                        type="button"
                        text="Delete"
                        color="red"
                        loading={loading[item.nanoId]}
                        onClick={() => handleClickDelete(item.nanoId)}
                    ></Button>
                </div>
            ))}
        </>
    );
};

export default Home;
