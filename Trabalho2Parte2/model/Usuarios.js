'user strict';
var sql = require('../db.js');

//comanda object constructor
var Comanda = function(comanda){
    this.mesa = comanda.mesa;
    this.estado = comanda.estado;
};
Comanda.createComanda = function (newComanda, result) {    
        sql.query("INSERT INTO comanda set ?", newComanda, function (err, res) {
                
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
Comanda.getComandaById = function (id, result) {
        sql.query("Select mesa from comanda where id = ? ", id, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Comanda.getAllComanda = function (result) {
        sql.query("Select * from comanda", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('comanda : ', res);  

                 result(null, res);
                }
            });   
};
Comanda.updateById = function(id, mesa, result){
  sql.query("UPDATE comanda SET mesa = ? WHERE id = ?", [Comanda.mesa, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Comanda.remove = function(id, result){
     sql.query("DELETE FROM comanda WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Comanda;