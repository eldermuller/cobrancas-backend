const yup = require('./yup');

const registerChargeSchema = yup.object().shape({
    cliente:
        yup
            .string()
            .required("Este campo deve ser preenchido"),
    descricao:
        yup
            .string()
            .required("Este campo deve ser preenchido"),
    status:
        yup
            .boolean(),
    valor:
        yup
            .number()
            .required("Este campo deve ser preenchido"),
    vencimento:
        yup
            .date()
            .required("Este campo deve ser preenchido")
});

module.exports = registerChargeSchema;