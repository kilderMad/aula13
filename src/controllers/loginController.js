const Login = require('../models/LoginModel')

exports.index = (req, res) => {//pagina de login e registro
    
    res.render('login');
    return;
};
exports.register = async function(req, res){
    try {
        const login = new Login(req.body); //req.body é os dados que foram enviados do form pelo usuario
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return;
        }
        req.flash('success','seu usuario foi cadastrado');
        req.session.save(function() {
            return res.redirect('/login/index');
        });
        
    } catch (error) {
        console.log(error);
        return res.render('error404')
    }

}

exports.login =  async function(req, res){
    try {
        const login = new Login(req.body); //req.body é os dados que foram enviados do form pelo usuario
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login/index');
            });
            return;
        }
        req.flash('success','Voce entrou no sistema');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/');
        });
        
    } catch (error) {
        console.log(error);
        return res.render('error404')
    }
}

exports.logout =  async function(req, res){
    req.session.destroy()
    res.redirect('/')
}