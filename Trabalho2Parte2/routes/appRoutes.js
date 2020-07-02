'use strict';
module.exports = function (app) {
    var comandaController = require('../controller/appController');
    var produtoComandaController = require('../controller/ProdutoComandaController');
    var produtoController = require('../controller/ProdutoController');
    var UsuariosController = require('../controller/UsuariosController');
    // comandaController Routes
    app.route('/comandas')
        .get(comandaController.list_all_comanda)
        .post(comandaController.create_a_comanda);

    app.route('/comanda/:Id')
        .get(comandaController.read_a_Comanda)
        .put(comandaController.update_a_comanda)
        .delete(comandaController.delete_a_comanda);


    app.route('/comanda/:Id/produtos')
        .get(produtoComandaController.list_all_produtos_comanda)
        .post(produtoComandaController.create_a_produto_comanda);

    app.route('/comanda/:Id/produto/:id_produto')
        .get(produtoComandaController.read_a_produto_comanda)
        .put(produtoComandaController.update_a_produto_comanda)
        .delete(produtoComandaController.delete_a_produto_comanda);

    app.route('/produtos')
        .get(produtoController.list_all_produtos)
        .post(produtoController.create_a_produto);

    app.route('/produto/:Id')
        .get(produtoController.read_a_produto)
        .put(produtoController.update_a_produto)
        .delete(produtoController.delete_a_produto);

};