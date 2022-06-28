const knex = require('../database/connection');
const registerClientSchema = require('../validations/registerClientSchema');

const registerClient = async (req, res) => {
    const { nome, email, cpf,
        telefone, cep, logradouro, complemento, bairro, cidade, estado } = req.body;

    const bodyFormatted = {
        nome: nome.trim(), email: email.trim(), cpf: cpf.trim(),
        telefone: telefone.trim(), cep, logradouro, complemento, bairro, cidade, estado
    }



    try {
        await registerClientSchema.validate(bodyFormatted);

        const clientExists = await knex('clientes').where({ email }).first();

        if (clientExists) {
            return res.status(400).json("E-mail já cadastrado");
        };

        const cpfExists = await knex('clientes').where({ cpf }).first();

        if (cpfExists) {
            return res.status(400).json("CPF já cadastrado");
        };

        const client = await knex('clientes')
            .insert({
                nome,
                email,
                cpf,
                telefone,
                cep,
                logradouro,
                complemento,
                bairro,
                cidade,
                estado
            })
            .returning('*');

        if (!client) {
            return res.status(400).json("O cadastro não foi concluído");
        };

        return res.status(200).json("Cadastro concluído com sucesso")
    } catch (error) {
        return res.status(500).json(error.message);
    };
};

const listAllClients = async (req, res) => {

    const clients = await knex('clientes').select('id', 'nome', 'email', 'telefone', 'cpf', 'condicao');

    try {
        return res.status(200).json(clients);

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

const clientDetails = async (req, res) => {

    const { id } = req.params;

    const client = await knex('clientes').where({ id }).first();

    try {

        return res.status(200).json({
            id: client.id,
            nome: client.nome,
            cpf: client.cpf,
            email: client.email,
            telefone: client.telefone,
            cep: client.cep,
            logradouro: client.logradouro,
            complemento: client.complemento,
            bairro: client.bairro,
            cidade: client.cidade,
            estado: client.estado
        })

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

const updateClient = async (req, res) => {

    const { id } = req.params;
    const { nome, email, cpf,
        telefone, cep, logradouro, complemento, bairro, cidade, estado } = req.body;

    try {

        const client = await knex('clientes').where({ id }).first().select('*');
        const findEmail = await knex('clientes').where({ email }).first();
        const findCpf = await knex('clientes').where({ cpf }).first();

        if (!client) {
            return res.status(404).json("Cliente não encontrado");
        }

        await registerClientSchema.validate(req.body);

        if (findEmail && findEmail.id !== client.id) {
            return res.status(400).json("E-mail inválido");
        }

        if (findCpf && findCpf.id !== client.id) {
            return res.status(400).json("CPF inválido");
        }

        const updateClient = await knex('clientes').where({ id }).update({
            nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado
        });

        if (!updateClient) {
            return res.status(400).json("Não foi possível atualizar os dados do cliente!");
        };

        return res.status(200).json("Cliente cadastrado com sucesso!");

    } catch (error) {
        return res.status(400).json(error.message);
    }
};


module.exports = {
    registerClient,
    listAllClients,
    clientDetails,
    updateClient
};