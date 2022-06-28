const yup = require('./yup');

const userLoginSchema = yup.object().shape({
    email: yup
        .string()
        .email("O E-mail precisa ter um formato válido")
        .required("O e-mail deve ser informado"),

    senha: yup
        .string()
        .required("A senha deve ser informada")
})

module.exports = userLoginSchema;
