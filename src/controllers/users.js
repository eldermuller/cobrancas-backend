const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const { userRegisterSchema, userRegisterEmailValidationSchema } = require('../validations/userRegisterSchema');
const updateUserSchema = require('../validations/updateUserSchema');

const userRegister = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const bodyFormatted = {
            nome: nome.trim(), email: email.trim(), senha: senha.trim()
        };

        await userRegisterSchema.validate(bodyFormatted);

        const emailExists = await knex('usuarios').where({ email }).first();

        if (emailExists) {
            return res.status(400).json("E-mail já cadastrado");
        };

        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        const numbers = /[0-9]/;
        const specialCharacters = /[[`!@#$%^&*()_=[\+\]{\\\};':"|,\.<>\/?~]/;

        if (!upperCase.test(senha)) {
            return res.status(400).json("A senha precisa ter no mínimo um cactere maiúsculo")
        };

        if (!lowerCase.test(senha)) {
            return res.status(400).json("A senha precisa ter no mínimo um cactere minúsculo")
        };

        if (!numbers.test(senha)) {
            return res.status(400).json("A senha precisa ter no mínimo um número");
        };

        if (!specialCharacters.test(senha)) {
            return res.status(400).json("A senha precisa ter no mínimo um símbolo ([`!@#$%^&*()_+\=\[\]{};':\"|,.<>\/?~)");
        };

        const encryptedPassword = await bcrypt.hash(senha, 10)

        const userData = await knex('usuarios').insert({
            nome,
            email,
            senha: encryptedPassword
        });

        return res.status(200).json("Cadastro concluído com sucesso");

    } catch (error) {
        return res.status(400).json(error.message);
    };
};

const getUser = async (req, res) => {
    return res.status(200).json(req.user);
};

const updateUser = async (req, res) => {
    let { nome, email, senha, cpf, telefone } = req.body;
    const { id, email: emailuser, cpf: cpfUser } = req.user;

    const bodyFormatted = {
        nome: nome.trim(), email: email.trim(), telefone
    };


    try {
        await updateUserSchema.validate(bodyFormatted);


        const userExists = await knex('usuarios').where({ id }).first();


        if (!userExists) {
            return res.status(404).json("Usuario não encontrado");
        };

        const emailExists = await knex('usuarios').where({ email }).first();

        if (emailExists && emailExists.email !== emailuser) {
            return res.status(400).json("E-mail já cadastrado");
        };

        if (cpf && cpf.trim() !== "" && cpf !== cpfUser) {
            const cpfExists = await knex('usuarios').where({ cpf }).first();

            if (cpfExists) {
                return res.status(400).json("CPF já cadastrado");
            };
        };

        if (senha && senha.trim() !== "") {
            const upperCase = /[A-Z]/;
            const lowerCase = /[a-z]/;
            const numbers = /[0-9]/;
            const specialCharacters = /[[`!@#$%^&*()_=[\+\]{\\\};':"|,\.<>\/?~]/;

            if (!upperCase.test(senha)) {
                return res.status(400).json("A senha precisa ter no mínimo um cactere maiúsculo")
            };

            if (!lowerCase.test(senha)) {
                return res.status(400).json("A senha precisa ter no mínimo um cactere minúsculo")
            };

            if (!numbers.test(senha)) {
                return res.status(400).json("A senha precisa ter no mínimo um número");
            };

            if (!specialCharacters.test(senha)) {
                return res.status(400).json("A senha precisa ter no mínimo um símbolo ([`!@#$%^&*()_+\=\[\]{};':\"|,.<>\/?~)");
            };
            senha = await bcrypt.hash(senha, 10);
        } else {
            senha = await knex('usuarios').where({ id }).returning('senha');
        };

        const updatedUser = await knex('usuarios')
            .where({ id })
            .update({
                nome,
                email,
                cpf,
                senha,
                cpf,
                telefone,
                senha
            })
            .returning('*');

        if (!updatedUser) {
            return res.status(400).json("O cadastro não foi alterado");
        };

        return res.status(200).json("Cadastro alterado com sucesso!");
    } catch (error) {
        return res.status(500).json(error.message);
    };
};

const userRegisterEmailValidation = async (req, res) => {
    const { nome, email } = req.body;

    try {
        await userRegisterEmailValidationSchema.validate(req.body);

        const emailExists = await knex('usuarios').where({ email }).first();

        if (emailExists) {
            throw { message: "E-mail já cadastrado." };
        };

        return res.status(200).json();
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    userRegister,
    userRegisterEmailValidation,
    getUser,
    updateUser
}