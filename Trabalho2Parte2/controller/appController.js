'use strict';

var comanda = require('../model/appModel.js');

exports.list_all_comanda = function(req, res) {
    comanda.getAllComanda(function(err, task) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', task);
    res.send(task);
  });
};



exports.create_a_comanda = function(req, res) {
  var new_Comanda = new comanda(req.body);

  //handles null error 
   if(!new_Comada.mesa || !new_task.status){

            res.status(400).send({ error:true, message: 'Please provide comanda/status' });

        }
else{
  
  Comanda.createTask(new_comanda, function(err, mesa) {
    
    if (err)
      res.send(err);
    res.json(task);
  });
}
};


exports.read_a_Comanda = function(req, res) {
    comanda.getTaskById(req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_comanda = function(req, res) {
    comanda.updateById(req.params.id, new comanda(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_comanda = function(req, res) {


    comanda.remove( req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
