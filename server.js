require('dotenv').config(); // para criar o arquivo env que esconde dados sensiveis
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)// conexao com banco de dados mongoose
  .then(()=> {
    app.emit('pronto')
}).catch(e=> console.log(e))
const session = require('express-session'); //session identifica sessao do cliente e salva
const MongoStore = require('connect-mongo');//sessoes serao salvas na BD
const flash = require('connect-flash')// informacoes que vao se excluir ao atualizar ao receber nova requisicao
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf'); // cria tokens para cada formulario para seguranca
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');


app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({ //coneccao com a sessao
    secret: 'jnjkpkokgo3x40flg5',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,// tempo pra sessao atualizar, aqui 7 dias
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', ()=>{
    app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});
})
