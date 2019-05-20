var config = require('./config.dev.json').db.connection;
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password
})

connection.connect();
connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``, function(err) {
  if (err) throw err;
  console.log(`Database ${config.database} was succesfully created`);
})
connection.end();



