export const erroresFirebase = (code) => {
    console.log(code);
    if (code === "auth/weak-password") {
        return "Password debe tener al menos 6 caracteres";
    } else if (code === "auth/email-already-in-use") {
        return "Correo ya existe";
    } else if (code === "auth/invalid-credential") {
        return "Credenciales inválidas";
    } else if (code === "auth/invalid-email") {
        return "Correo inválido";
    } else {
        return "Ocurrió un error en el server";
    }
};
