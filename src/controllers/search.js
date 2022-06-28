const knex = require('../database/connection');

const search = async (req, res) => {

    const { tabela, input } = req.query;

    try {

        if (tabela === 'cobranca') {

            const inputType = isNaN(input)

            if (inputType === true) {

                const charge = await knex('cobrancas').whereILike('cliente', `%${input}%`);

                if (!charge) {
                    return res.status(404).json('Cobrança não encontrada!')
                }

                for (let item of charge) {
                    item.status = item.status.toString().replace(true, "Pago");
                };

                for (let item of charge) {
                    if (item.vencimento < new Date()) {
                        item.status = item.status.toString().replace(false, "Vencido");
                    } else {
                        item.status = item.status.toString().replace(false, "Pendente");
                    };
                }
                return res.status(200).json(charge)


            }

            if (inputType === false) {

                const newInput = parseInt(input);
                const charge = await knex('cobrancas').where('id', newInput);

                if (!charge) {
                    return res.status(404).json('Cobrança não encontrada!')
                }

                for (let item of charge) {
                    item.status = item.status.toString().replace(true, "Pago");
                };
                for (let item of charge) {
                    if (item.vencimento < new Date()) {
                        item.status = item.status.toString().replace(false, "Vencido");
                    } else {
                        item.status = item.status.toString().replace(false, "Pendente");
                    };
                }

                return res.status(200).json(charge);
            }
        };

        if (tabela === 'cliente') {

            const client = await knex('clientes').whereILike('nome', `%${input}%`).orWhereILike('cpf', `%${input}%`)
                .orWhereILike('email', `%${input}%`);

            return res.status(200).json(client)
        }
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    search
};