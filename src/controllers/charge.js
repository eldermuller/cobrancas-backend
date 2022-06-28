const knex = require('../database/connection');
const registerChargeSchema = require('../validations/registerChargeSchema');
const updateChargeSchema = require('../validations/updateChargeSchema');

const registerCharge = async (req, res) => {
    const { id, cliente, descricao, status, valor, vencimento } = req.body;

    const bodyFormatted = {
        cliente: cliente.trim(), descricao: descricao.trim(), status,
        valor, vencimento: vencimento.trim()
    };

    try {
        await registerChargeSchema.validate(bodyFormatted);

        const clientExists = await knex('clientes').where({ id }).first();

        if (!clientExists) {
            return res.status(400).json("O cliente informado não existe");
        };

        const charge = await knex('cobrancas')
            .insert({
                cliente,
                id_cliente: id,
                descricao,
                status,
                valor,
                vencimento
            })
            .returning('*');

        if (!charge) {
            return res.status(400).json("O cadastro não foi concluído");
        };

        await knex('clientes')
            .where({ id })
            .update({
                condicao: status
            });

        return res.status(200).json("Cobrança cadastrada com sucesso");
    } catch (error) {
        return res.status(500).json(error.message);
    };
};

const getCharges = async (req, res) => {
    try {
        let charges = await knex('cobrancas');

        for (let charge of charges) {
            if (charge.status === true) {
                charge.status = (charge.status.toString().replace(true, "Pago"));
            } else if (charge.status === false && charge.vencimento < new Date()) {
                charge.status = (charge.status.toString().replace(false, "Vencido"));
            } else {
                charge.status = (charge.status.toString().replace(false, "Pendente"));
            };
        };

        return res.status(200).json(charges);
    } catch (error) {
        return res.status(500).json(error.message);
    };
};

const detailChargesClient = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json("Cliente não informado");
    };

    try {
        const clientExists = await knex('clientes').where({ id }).first();

        if (!clientExists) {
            return res.status(404).json("O cliente informado não existe");
        };

        const id_cliente = id;

        let chargesClient = await knex('cobrancas').where({ id_cliente });

        if (!chargesClient) {
            return res.status(404).json("Não há cobranças para esse cliente");
        };

        for (let charge of chargesClient) {
            if (charge.status === true) {
                charge.status = (charge.status.toString().replace(true, "Pago"));
            } else if (charge.status === false && charge.vencimento < new Date()) {
                charge.status = (charge.status.toString().replace(false, "Vencido"));
            } else {
                charge.status = (charge.status.toString().replace(false, "Pendente"));
            };
        };

        return res.status(200).json(chargesClient);
    } catch (error) {
        return res.status(500).json(error.message);
    };

};

const updateCharge = async (req, res) => {
    const { id, id_cliente, descricao, status, valor, vencimento } = req.body;


    try {
        await updateChargeSchema.validate(req.body);

        const chargeExists = await knex('cobrancas').where({ id }).first();

        if (!chargeExists) {
            return res.status(400).json("A cobrança informada não existe");
        };

        const chargeUpdate = await knex('cobrancas')
            .where({ id })
            .update({
                descricao,
                status,
                valor,
                vencimento
            })
            .returning("*");

        if (!chargeUpdate) {
            return res.status(400).json("O cadastro não foi concluído");
        };

        await knex('clientes')
            .where({ id: id_cliente })
            .update({
                condicao: status
            });

        return res.status(200).json("Cobrança editada com sucesso");
    } catch (error) {
        return res.status(500).json(error.message);
    };
};

const viewAll = async (req, res) => {

    try {
        const chargesFalse = await knex('cobrancas').where({ status: false, });
        const chargesTrue = await knex('cobrancas').where({ status: true });
        const clientsFalse = await knex('clientes').where({ condicao: false });
        const clientsTrue = await knex('clientes').where({ condicao: true });

        let expired = [];
        let pending = [];

        for (let item of chargesFalse) {
            if (item.vencimento < new Date()) {
                item.status = item.status.toString().replace(false, "Vencido");
                expired.push(item);
            } else {
                item.status = item.status.toString().replace(false, "Pendente");
                pending.push(item);
            };
        };

        for (let item of chargesTrue) {
            item.status = item.status.toString().replace(true, "Pago");
        };

        return res.status(200).json({ expiradas: expired, previstas: pending, pagas: chargesTrue, clientesEmDia: clientsTrue, clientesInadimplentes: clientsFalse });
    } catch (error) {
        return res.status(500).json(error.message);
    };
};

const deleteCharge = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json('Informe o id da cobrança');
    };

    try {
        const chargeExists = await knex('cobrancas').where({ id }).first().returning('*');

        if (!chargeExists) {
            return res.status(400).json("A cobrança informada não existe");
        };

        if (chargeExists.status === true || chargeExists.vencimento < new Date()) {
            return res.status(403).json("A cobrança não pode ser deletada");
        };

        const chargeDelete = await knex('cobrancas').where({ id }).del();

        if (!chargeDelete) {
            return res.status(400).json("A cobrança não pôde ser deletada");
        };

        return res.status(200).json("A cobrança foi excluída");
    } catch (error) {
        return res.status(500).json(error.message);
    };

};

module.exports = {
    registerCharge,
    getCharges,
    detailChargesClient,
    updateCharge,
    viewAll,
    deleteCharge
};