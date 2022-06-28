const yup = require('./yup');

const registerClientSchema = yup.object().shape({
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
            .required("Este campo deve ser preenchido"),
    telefone:
        yup
            .number()
            .required("Este campo deve ser preenchido"),
    cep:
        yup
            .string(),
    logradouro:
        yup
            .string(),
    complemento:
        yup
            .string(),
    bairro:
        yup
            .string(),
    cidade:
        yup
            .string(),
    estado:
        yup
            .string()
});

module.exports = registerClientSchema;