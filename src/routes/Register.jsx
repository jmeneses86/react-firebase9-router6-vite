import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
    /* const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); */

    const { registerUser } = useContext(UserContext);

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
            console.log(error);
            if (error.code === "auth/weak-password") {
                console.log("Password debe tener al menos 6 caracteres");
                setError("email", {
                    message: "Password debe tener al menos 6 caracteres",
                });
            } else if (error.code === "auth/email-already-in-use") {
                console.log("Correo ya existe");
                setError("email", {
                    message: "Correo ya existe",
                });
            }
        }
    };

    return (
        <>
            <div>Register</div>
            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Ingrese email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Email es requerido",
                        },
                        pattern: {
                            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[_a-z0-9]+)*(\.[a-z{2,15}])/,
                            message: "Formato de email incorrecto",
                        },
                    })}
                    /* value={email}
                    onChange={(e) => setEmail(e.target.value)} */
                ></input>
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    type="password"
                    placeholder="Ingrese password"
                    {...register("password", {
                        minLenght: {
                            value: 6,
                            message:
                                "Password debe tener al menos 6 caracteres",
                        },
                        validate: {
                            trim: (v) => {
                                if (!v.trim()) {
                                    return "Ingrese password";
                                } else {
                                    return true;
                                }
                            },
                        },
                    })}
                    /* value={password}
                    onChange={(e) => setPassword(e.target.value)} */
                ></input>
                {errors.password && <p>{errors.password.message}</p>}
                <input
                    type="password"
                    placeholder="Ingrese password"
                    {...register("repassword", {
                        validate: {
                            equals: (v) =>
                                v === getValues("password") ||
                                "No coinciden las contraseñas",
                        },
                    })}
                ></input>
                {errors.repassword && <p>{errors.repassword.message}</p>}
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
