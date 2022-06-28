const yup = require('./yup');

const userRegisterSchema = yup.object().shape({
    senha:
        yup
            .string()
            .min(5)
            .required("Este campo deve ser preenchido - senha")

});

const userRegisterEmailValidationSchema = yup.object().shape({
    nome:
        yup
            .string()
            .required("Este campo deve ser preenchido - nome"),
    email:
        yup
            .string()
            .email("O E-mail precisa ter um formato válido")
            .required("Este campo deve ser preenchido - email")
})

module.exports = {
    userRegisterSchema,
    userRegisterEmailValidationSchema
}