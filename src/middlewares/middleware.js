exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.send('error404 - erro na verificaçao csrf')
    }
    next()
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) =>{//para usar middlera, va em rotas!!
    if(!req.session.user){
        req.flash('errors', 'Você precisa fazer login para cadastrar, excluir ou editar contatos')
        req.session.save(()=> res.redirect('/'));
        return; //como nao esta logado, acaba o codigo aqui
    }

    next(); //como esta logado, proximo midleware
};