import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Login = () => {
    /* const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); */
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
            console.log(error);
            setError("firebase", {
                message: erroresFirebase(error.code),
            });
        }
    };

    /* const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        try {
            await loginUser(email, password);
            navegate("/");
        } catch (error) {
            console.log(error);
        }
    }; */

    return (
        <div>
            <h1>Login</h1>
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
                {/* <input
                    type="email"
                    placeholder="Ingrese email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Ingrese password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input> */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
