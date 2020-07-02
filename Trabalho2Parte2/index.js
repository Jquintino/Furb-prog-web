const express = require('express'),
  app = express(),
  db = require('./db'),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;
  require('dotenv/config');

const env = process.env;
const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: env.DB_host,
    user: env.DB_user,
    password: env.DB_password,
    database: env.DB_DataBase
});

// connect to database
mc.connect();

mc.query('select 1 from dual');

/* in case of need to reset the tables
mc.query('Drop table Produto_Comanda;');
mc.query('Drop table Comanda;');
mc.query('Drop table Produto;');
*/

mc.query('CREATE TABLE IF NOT EXISTS Comanda ('+
                                                '`id` int(11) NOT NULL AUTO_INCREMENT,'+
                                                '`mesa` varchar(200) NOT NULL,'+
                                                '`estado` tinyint(1) NOT NULL DEFAULT "1",'+
                                                '`timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,'+
                                                'PRIMARY KEY (`id`));');

mc.query('CREATE TABLE IF NOT EXISTS Produto ( '+
												'`id` int(11) NOT NULL AUTO_INCREMENT,'+
												'`desc` varchar(200) NOT NULL,'+
												' `preco` float(8,5) ,'+
												'`timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,'+
												' PRIMARY KEY (`id`));');

mc.query('CREATE TABLE IF NOT EXISTS Produto_Comanda ( '+
														'`id` int(11) NOT NULL AUTO_INCREMENT,'+
														'`id_produto` int(11) NOT NULL, '+
														'`id_comanda` int(11) NOT NULL, '+
														'`qtd` int(11) default 0 ,'+
														'`timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,'+
														' PRIMARY KEY (`id`),'+
                                                        ' FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id`),'+
                                                        ' FOREIGN KEY (`id_comanda`) REFERENCES `Comanda`(`id`));');

mc.query('CREATE TABLE IF NOT EXISTS Usuario ( '+
                                                        '`id` int(11) NOT NULL,'+
                                                        '`user` varchar(250) NOT NULL, '+
                                                        '`password` varchar(250) NOT NULL, '+
                                                        '`timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,'+
                                                        ' PRIMARY KEY (`id`))');                                                        

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/approutes'); //importing route
routes(app); //register the route
