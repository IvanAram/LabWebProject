var mysql = require('mysql');
var pool = {};
const secret = require('./config/secret.json');

exports.connect = function(done){
	pool = mysql.createPool({
		host: secret.database.host,
		user: secret.database.user,
		password: secret.database.password,
		port: secret.database.port,
		database: secret.database.database
	});
	done();
}

exports.get = function(){
	return pool;
}
