const mongoose = require('mongoose')
const validator = require('validator'); //para validar email
const bcryptjs = require('bcryptjs');

// pequena validaçao para dizer que quer esses dados e qual tipo
const LoginSchema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },

})

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        
        try {
            //fazendo um hash da senha, nao precisa decorar
            const salt = bcryptjs.genSaltSync();
            this.body.password = bcryptjs.hashSync(this.body.password, salt);
            //manda para o BD os dados do form
            this.user = await LoginModel.create(this.body); 
        } catch (e) {
            console.log(e)
        }

    }

    valida() {
        this.cleanUp();
        if (!validator.isEmail(this.body.email)) this.errors.push('Email Invalido')

        if (this.body.password.length <= 3 || this.body.password.length >= 40) {
            this.errors.push('Senha precisa ter entre 4 e 40 caracteres.')
        }

    }

    cleanUp() {
        // para garantir que so havera chaves em string
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        // para pegar apenas os dados necessarios para o BD
        // no caso removendo( nao colocando o) o csrf 
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login