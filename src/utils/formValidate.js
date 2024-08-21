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
        patternURL: {
            value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
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
        validateEquals(value) {
            return {
                equals: (v) =>
                    v === value || "No coinciden los valores de los campos",
            };
        },
    };
};
