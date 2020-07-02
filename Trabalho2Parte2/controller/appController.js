'use strict';

var comanda = require('../model/Comanda.js');

exports.list_all_comanda = function(req, res) {
    comanda.getAllComanda(function(err, comanda) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', comanda);
    res.send(comanda);
  });
};



exports.create_a_comanda = function(req, res) {
  var new_Comanda = new comanda(req.body);
    console.log(new_Comanda);
  //handles null error 
   if(!new_Comanda.mesa){

            res.status(400).send({ error:true, message: 'Please provide comanda/status' });

        }
else{
  
  comanda.createComanda(new_Comanda, function(err, mesa) {
    
    if (err)
      res.send(err);
    res.json(comanda);
  });
}
};


exports.read_a_Comanda = function(req, res) {
    comanda.getcomandaById(req.params.id, function(err, comanda) {
    if (err)
      res.send(err);
    res.json(comanda);
  });
};


exports.update_a_comanda = function(req, res) {
    comanda.updateById(req.params.id, new comanda(req.body), function(err, comanda) {
    if (err)
      res.send(err);
    res.json(comanda);
  });
};


exports.delete_a_comanda = function(req, res) {


    comanda.remove( req.params.id, function(err, comanda) {
    if (err)
      res.send(err);
    res.json({ message: 'comanda successfully deleted' });
  });
};
