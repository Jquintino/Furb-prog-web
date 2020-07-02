'use strict';
module.exports = function(app) {
  var todoList = require('../controller/appController');

  // todoList Routes
  app.route('/comandas')
    .get(todoList.list_all_comanda)
    .post(todoList.create_a_comanda);
   
   app.route('/comanda/:Id')
    .get(todoList.read_a_Comanda)
    .put(todoList.update_a_comanda)
    .delete(todoList.delete_a_comanda);
    };