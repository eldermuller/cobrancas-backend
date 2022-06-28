const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const userLoginSchema = require('../validations/userLoginSchema');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {

    const { email, senha } = req.body;

    try {
        await userLoginSchema.validate(req.body);

        const user = await knex('usuarios').where({ email }).first();

        if (!user) {
            return res.status(404).json("E-mail e/ou senha inválidos");
        }

        const passwordCompare = await bcrypt.compare(senha, user.senha);

        if (!passwordCompare) {
            return res.status(400).json("E-mail e/ou senha inválidos");
        }

        const token = jwt.sign({ id: user.id }, process.env.PASSWORD_JWT, { expiresIn: '12h' });

        return res.status(200).json({
            id: user.id,
            user: user.nome,
            token
        });

    } catch (error) {
        return res.status(400).json(error.message);
    };
};

module.exports = {
    userLogin
};