export const erroresFirebase = (code) => {
    console.log(code);
    if (code === "auth/weak-password") {
        return {
            code: "password",
            message: "La contraseña debe tener al menos 6 caracteres",
        };
    } else if (code === "auth/email-already-in-use") {
        return {
            code: "email",
            message: "Correo electrónico ya está en uso",
        };
    } else if (code === "auth/invalid-credential") {
        return {
            code: "email",
            message: "Correo electrónico o contraseña incorrectos",
        };
    } else if (code === "auth/invalid-email") {
        return {
            code: "email",
            message: "Correo electrónico no válido",
        };
    } else {
        return {
            code: "general",
            message: "Error desconocido",
        };
    }
};
