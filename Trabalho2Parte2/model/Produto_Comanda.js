'user strict';
var sql = require('../db.js');

//produto_comanda object constructor
var Produto_comanda = function(produto_comanda){
    this.id_produto = produto_comanda.id_produto;
    this.id_comanda = produto_comanda.id_comanda;
    this.qtd = produto_comanda.qtd;
};
Produto_comanda.createProduto_comanda = function (newProduto_comanda, result) {    
        sql.query("INSERT INTO produto_comanda set ?", newProduto_comanda, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Produto_comanda.getProduto_comandaById = function (id, result) {
        sql.query("Select id_produto from produto_comanda where id = ? ", id, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Produto_comanda.getAllProduto_comanda = function (result) {
        sql.query("Select * from produto_comanda", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('produto_comanda : ', res);  

                 result(null, res);
                }
            });   
};
Produto_comanda.updateById = function(id, id_produto, result){
  sql.query("UPDATE produto_comanda SET qtd = ? WHERE id = ?", [Produto_comanda.qtd, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Produto_comanda.remove = function(id, result){
     sql.query("DELETE FROM produto_comanda WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Produto_comanda;