'user strict';

var mysql = require('mysql');
require('dotenv/config');

const env = process.env;
//local mysql db connection
var connection = mysql.createConnection({
    host: env.DB_host,
    user: env.DB_user,
    password:env.DB_password,
    database: env.DB_DataBase
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;