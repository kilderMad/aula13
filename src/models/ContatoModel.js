const mongoose = require('mongoose')// banco de dados
const validator = require('validator'); //para validar email

// pequena validaçao para dizer que quer esses dados e qual tipo
const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false, default: ''},
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now} 
})

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register(){
        this.valida();
        if(this.errors.length > 0) return;
        //verificar se existe
        //if (this.user = await ContatoModel.findOne({ email: this.body.email})) this.errors.push('Email ja existente')
        if(this.errors.length > 0) return;

        //registro bd
        this.user = await ContatoModel.create(this.body);
    }

    valida(){
        if(!this.body.nome) this.errors.push('Nome é um campo obrigatorio!');
        if(!this.body.telefone) this.errors.push('Telefone é um campo obrigatorio!');
    }

    async buscaPorId(id){
        if(typeof id !== 'string') return;
        const user = await ContatoModel.findById(id);
        return user
    }

    async edit(id){
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;

        //aqui procura no bd pelo id e atualiza com o segundo param e o terciro pra ja mostrar
        this.user = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true});


    }

    async buscaContatos(){
        const users = await ContatoModel.find()
        .sort({criadoEm: -1});
        return users
    }

    async excluirContato(id){
        if(typeof id !== 'string') return;
        await ContatoModel.findByIdAndDelete(id);
    }
}

module.exports = Contato