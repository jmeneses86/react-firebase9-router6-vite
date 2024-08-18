import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";

const Register = () => {
    const { registerUser } = useContext(UserContext);

    const { required, patternEmail, minLenght, validateTrim, validateEquals } =
        formValidate();

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
            await registerUser(email, password);
            navegate("/");
        } catch (error) {
            setError("firebase", {
                message: erroresFirebase(error.code),
            });
        }
    };

    return (
        <>
            <div>Register</div>
            <FormError errors={errors.firebase}></FormError>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese email"
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
                    {...register("password", {
                        minLenght,
                        validate: validateTrim,
                    })}
                >
                    <FormError errors={errors.password}></FormError>
                </FormInput>
                <FormInput
                    type="password"
                    placeholder="Ingrese password"
                    {...register("repassword", {
                        validate: validateEquals(getValues),
                    })}
                >
                    <FormError errors={errors.repassword}></FormError>
                </FormInput>
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
