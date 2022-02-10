const Login = require('../models/LoginModel')

exports.index = (req, res) => {

    res.render('login');
    return;
};
exports.register = async(req, res) => {
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
        req.flash('success','seu ursuario foi cadastrado');
        req.session.save(function() {
            return res.redirect('/login/index');
        });
        
    } catch (error) {
        console.log(error);
        return res.render('404')
    }

}