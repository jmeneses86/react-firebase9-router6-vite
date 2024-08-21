import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useFirestore from "../hooks/useFirestore";

import { formValidate } from "../utils/formValidate";
import { erroresFirebase } from "../utils/erroresFirebase";

import Title from "../components/Title";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";

const Home = () => {
    const { required, patternURL } = formValidate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
        setValue,
        setError,
    } = useForm();

    const { data, error, loading, getData, addData, deleteData, updateData } =
        useFirestore();

    const [newOriginId, setNewOriginId] = useState();

    const [copy, setCopy] = useState({});

    useEffect(() => {
        console.log("getData");
        getData();
    }, []);

    if (loading.getData) return <p>Loading. . .</p>;
    if (error) return <p>{error}</p>;

    const onSubmit = async ({ url }) => {
        try {
            if (newOriginId) {
                await updateData(newOriginId, url);
                setNewOriginId("");
            } else {
                await addData(url);
            }
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        } finally {
        }
        resetField("url");
    };

    const handleClickDelete = async (nanoId) => {
        await deleteData(nanoId);
    };

    const handleClickEdit = async (item) => {
        setValue("url", item.origin);
        setNewOriginId(item.nanoId);
    };

    const pathURL = window.location.href;

    const handleClickCopy = async (nanoId) => {
        await navigator.clipboard.writeText(window.location.href + nanoId);
        console.log("copiado: " + window.location.href + nanoId);
        setCopy({ [nanoId]: true });
    };

    return (
        <>
            <Title text="Home"></Title>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="text"
                    placeholder="http://bluuweb.org"
                    label="Ingresa tu URL"
                    error={errors.url}
                    {...register("url", {
                        required,
                        pattern: patternURL,
                    })}
                >
                    <FormError errors={errors.url}></FormError>
                </FormInput>
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
                <div
                    key={item.nanoId}
                    className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2"
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {pathURL}
                        {item.nanoId}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.origin}
                    </p>
                    <div className="flex space-x-2">
                        <Button
                            type="button"
                            text="Edit"
                            color="yellow"
                            onClick={() => handleClickEdit(item)}
                        ></Button>
                        <Button
                            type="button"
                            text={copy[item.nanoId] ? "Copied" : "Copy"}
                            color="blue"
                            onClick={() => handleClickCopy(item.nanoId)}
                        ></Button>
                        <Button
                            type="button"
                            text="Delete"
                            color="red"
                            loading={loading[item.nanoId]}
                            onClick={() => handleClickDelete(item.nanoId)}
                        ></Button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Home;
