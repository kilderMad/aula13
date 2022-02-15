const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
  res.render('cadastrarContato', {
    contato: {},
  });
};

exports.register = async(req, res) => {
  const contato = new Contato(req.body);
  
  try {

    
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(function() {
          return res.redirect('/contato/index');
      });
      return;
    }
      req.flash('success','Contato cadastrado');
      req.session.save(function() {
          return res.redirect(`/contato/index`);
      });  
    } catch (error) {
      console.log(error)
      return res.render('error404')
    }
  
}

exports.edit = async(req, res) => {
  if(!req.params.id) return res.render('error404');
  const contato = new Contato(req.body);
  const contatoSelect = await contato.buscaPorId(req.params.id);

  if(!contatoSelect) return res.render('error404');

  res.render('cadastrarContato', { contato : contatoSelect });


}

exports.editar = async(req, res) => {
  if(!req.params.id) return res.render('error404');
  const contato = new Contato(req.body);
 
  try{
  await contato.edit(req.params.id);

  if (contato.errors.length > 0) {
    req.flash('errors', contato.errors);
    req.session.save(function() {
        return res.redirect('/contato/index');
    });
    return;
  }
    req.flash('success','Contato editado');
    req.session.save(function() {
        return res.redirect(`/`);
    });  
  } catch (error) {
    console.log(error)
    return res.render('error404')
  }
}

exports.excluir = async (req,res)=> {
  if(!req.params.id) return res.render('error404');

  try{
    const contato = new Contato();
    if(!contato) return res.render('error404');

    await contato.excluirContato(req.params.id);
    req.session.save(function() {
      return res.redirect(`/`);
    });
  }catch(e){
    console.log(error)
    return res.render('error404')
  }
}