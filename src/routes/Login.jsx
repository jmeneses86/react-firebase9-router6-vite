import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
    const { loginUser } = useContext(UserContext);

    const { required, patternEmail, minLenght, validateTrim } = formValidate();

    const navegate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            await loginUser(email, password);
            navegate("/");
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        }
    };

    return (
        <div>
            <Title text="Ingreso de usuarios"></Title>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese email"
                    label="Ingresa tu correo"
                    error={errors.email}
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                >
                    <FormError errors={errors.email}></FormError>
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Ingrese password"
                    label="Ingresa tu contraseña"
                    error={errors.password}
                    {...register("password", {
                        minLenght,
                        validate: validateTrim,
                    })}
                >
                    <FormError errors={errors.password}></FormError>
                </FormInput>
                <Button type="submit" text="Ingresar"></Button>
            </form>
        </div>
    );
};

export default Login;
