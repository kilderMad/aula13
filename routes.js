const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController')

const { loginRequired } = require('./src/middlewares/middleware') //2-pegando o middleware

// Rotas da home
route.get('/', homeController.index);

// rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// rotas de contato
// no loginRequired, como ele esta no meio, colocar o next! para passar pro o controller
route.get('/contato/index', loginRequired, contatoController.index)//3-usando o middleware
route.post('/contato/register', loginRequired, contatoController.register)//rota para registrar o contato no bd
route.get('/contato/index/:id', loginRequired, contatoController.edit)//botao editar leva pra essa rota
route.post('/contato/editar/:id', loginRequired, contatoController.editar)// salvar do edit leva pra ca pra salvar ediçao no bd
route.get('/contato/excluir/:id', loginRequired, contatoController.excluir)//botao excluir leva pra essa rota


module.exports = route;