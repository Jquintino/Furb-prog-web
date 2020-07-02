'user strict';
var sql = require('../db.js');

//produto object constructor
var Produto = function(produto){
    this.desc = produto.desc;
    this.preco = produto.preco;
};
Produto.createProduto = function (newProduto, result) {    
        sql.query("INSERT INTO produto set ?", newProduto, function (err, res) {
                
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
Produto.getProdutoById = function (id, result) {
        sql.query("Select desc from produto where id = ? ", id, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Produto.getAllProduto = function (result) {
        sql.query("Select * from produto", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('produto : ', res);  

                 result(null, res);
                }
            });   
};
Produto.updateById = function(id, desc, result){
  sql.query("UPDATE produto SET desc = ? WHERE id = ?", [Produto.desc, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Produto.remove = function(id, result){
     sql.query("DELETE FROM produto WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Produto;