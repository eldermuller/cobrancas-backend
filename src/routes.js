const express = require('express');

const { userRegister, userRegisterEmailValidation, getUser, updateUser } = require('./controllers/users');
const { userLogin } = require('./controllers/usersLogin');
const { registerClient, listAllClients, clientDetails, updateClient } = require('./controllers/clients');
const loginFilter = require('./filters/loginFilter');
const { registerCharge, getCharges, detailChargesClient, updateCharge, viewAll, deleteCharge } = require('./controllers/charge');
const { search } = require('./controllers/search');

const routes = express();

const cors = require('cors');
routes.options('*', cors())

routes.post('/login', userLogin);

routes.post('/validar-email', userRegisterEmailValidation);
routes.post('/cadastro-usuario', userRegister);

routes.use(loginFilter);

routes.get('/obter-usuario', getUser);
routes.patch('/atualizar-usuario', updateUser);

routes.post('/cadastro', registerClient);
routes.get('/listar-clientes', listAllClients);
routes.get('/detalhar-cliente/:id', clientDetails);
routes.patch('/atualizar-cliente/:id', updateClient);

routes.post('/cadastro-cobranca', registerCharge);
routes.get('/listagem-cobrancas', getCharges);
routes.get('/detalhar-cobrancas/:id', detailChargesClient);
routes.patch('/atualizar-cobranca', updateCharge);
routes.delete('/excluir-cobranca/:id', deleteCharge);

routes.get('/ver-todos', viewAll);

routes.get('/busca', search);

module.exports = routes;