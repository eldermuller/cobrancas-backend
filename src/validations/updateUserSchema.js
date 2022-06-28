const yup = require('./yup');

const updateUserSchema = yup.object().shape({
    nome:
        yup
            .string()
            .required("Este campo deve ser preenchido"),

    email:
        yup
            .string()
            .email("O E-mail precisa ter um formato válido")
            .required("Este campo deve ser preenchido"),
    cpf:
        yup
            .string()
            .min(11)
            .max(11)
});

module.exports = updateUserSchema;