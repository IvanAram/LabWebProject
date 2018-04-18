var mysql = require('mysql');
var pool = {};
const secret = require('./config/secret.json').database;

exports.connect = function(done){
	pool = mysql.createPool({
		host: secret.host,
		user: secret.user,
		password: secret.password,
		port: secret.port,
		database: secret.database
	});
	done();
}

exports.get = function(){
	return pool;
}
