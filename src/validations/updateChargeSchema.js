const yup = require('./yup');

const updateChargeSchema = yup.object().shape({
    descricao:
        yup
            .string()
            .required("Este campo deve ser preenchido"),
    status:
        yup
            .boolean()
            .required(),
    valor:
        yup
            .number()
            .required("Este campo deve ser preenchido"),
    vencimento:
        yup
            .date()
            .required("Este campo deve ser preenchido")
});

module.exports = updateChargeSchema;