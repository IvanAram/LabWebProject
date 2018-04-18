var db = require('../db.js');
var Table = require('../models/Table');

exports.get = function(req, res) {
  db.get().query('SELECT * FROM Tables', function(err, rows) {
    var response = {};
    var data = [];
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else {
      for (var i = 0; i < rows.length; i++) {
        var table = new Table(rows[i].t_id, rows[i].seats);
        data.push(table);
      }
      response.status = 0;
      response.message = 'Success';
      response.data = data;
    }
    res.send(response);
  });
}

exports.update = function(req, res) {
  db.get().query("", function(err, rows) {
    let response = {};
    if(err){
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else{
      response.status = 0;
      response.message = 'Success';
    }
  });
}

exports.create = function(req, res) {
  db.get().query("", function(err, rows) {
    let response = {};
    if(err){
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else{
      response.status = 0;
      response.message = 'Success';
    }
  });
}

exports.delete = function(req, res) {
  db.get().query("", function(err, rows) {
    let response = {};
    if(err){
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else{
      response.status = 0;
      response.message = 'Success';
    }
  });
}
