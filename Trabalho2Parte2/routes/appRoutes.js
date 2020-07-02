'use strict';
module.exports = function (app) {
    var todoList = require('../controller/appController');

    // todoList Routes
    app.route('/comandas')
        .get(todoList.list_all_comanda)
        .post(todoList.create_a_comanda);

    app.route('/comanda/:Id')
        .get(todoList.read_a_Comanda)
        .put(todoList.update_a_comanda)
        .delete(todoList.delete_a_comanda);

/*
    app.route('/comanda/:Id/produtos')
        .get(todoList.list_all_produtos_comanda)
        .post(todoList.create_a_produto_comanda);

    app.route('/comanda/:Id/produto/:id_produto')
        .get(todoList.read_a_produto_Comanda)
        .put(todoList.update_a_produto_comanda)
        .delete(todoList.delete_a_produto_comanda);

    app.route('/produtos')
        .get(todoList.list_all_produto)
        .post(todoList.create_a_produto);

    app.route('/produto/:Id')
        .get(todoList.read_a_produto)
        .put(todoList.update_a_produto)
        .delete(todoList.delete_a_produto);
*/
};