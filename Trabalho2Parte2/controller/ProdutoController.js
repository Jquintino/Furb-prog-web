'use strict';

var comanda = require('../model/Comanda.js');

exports.list_all_produtos = function(req, res) {
    comanda.getAllproduto(function(err, comanda) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', comanda);
    res.send(comanda);
  });
};



exports.create_a_produto = function(req, res) {
  var new_Comanda = new comanda(req.body);
    console.log(new_Comanda);
  //handles null error 
   if(!new_Comanda.mesa){

            res.status(400).send({ error:true, message: 'Please provide comanda/status' });

        }
else{
  
  comanda.createproduto(new_Comanda, function(err, mesa) {
    
    if (err)
      res.send(err);
    res.json(comanda);
  });
}
};


exports.read_a_produto = function(req, res) {
    comanda.getprodutoById(req.params.id, function(err, comanda) {
    if (err)
      res.send(err);
    res.json(comanda);
  });
};


exports.update_a_produto = function(req, res) {
    comanda.updateById(req.params.id, new comanda(req.body), function(err, comanda) {
    if (err)
      res.send(err);
    res.json(comanda);
  });
};


exports.delete_a_produto = function(req, res) {


    comanda.remove( req.params.id, function(err, comanda) {
    if (err)
      res.send(err);
    res.json({ message: 'comanda successfully deleted' });
  });
};
