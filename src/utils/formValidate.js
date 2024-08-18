export const formValidate = () => {
    return {
        required: {
            value: true,
            message: "Email es requerido",
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[_a-z0-9]+)*(\.[a-z{2,15}])/,
            message: "Formato de email incorrecto",
        },
        minLenght: {
            value: 6,
            message: "Password debe tener al menos 6 caracteres",
        },
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) {
                    return "Ingrese password";
                } else {
                    return true;
                }
            },
        },
        validateEquals(getValues) {
            return {
                equals: (v) =>
                    v === getValues("password") ||
                    "No coinciden las contraseñas",
            };
        },
    };
};
