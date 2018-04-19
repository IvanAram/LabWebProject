var db = require('../db.js');
var Waiter = require('../models/Waiter');

exports.get = function(req, res) {
  db.get().query('SELECT * FROM Waiters', function(err, rows) {
    var response = {};
    var data = [];
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else {
      for (var i = 0; i < rows.length; i++) {
        var waiter = new Waiter(rows[i].w_id, rows[i].name);
        data.push(waiter);
      }
      response.status = 0;
      response.message = 'Success';
      response.data = data;
    }
    res.send(response);
  });
}

exports.update = function(req, res) {
  db.get().query("UPDATE Waiters SET name = '" + req.body.name + "' WHERE w_id = " + req.params.id, function(err, rows) {
    let response = {};
    if(err){
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else{
      response.status = 0;
      response.message = 'Success';
    }
    res.send(response);
  });
}

exports.create = function(req, res) {
  db.get().query("INSERT INTO Waiters (name) VALUES ('" + req.body.name + "')", function(err, rows) {
    let response = {};
    if(err){
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else{
      response.status = 0;
      response.message = 'Success';
    }
    res.send(response);
  });
}

exports.delete = function(req, res) {
  db.get().query("DELETE FROM Waiters WHERE w_id = " + req.params.id, function(err, rows) {
    let response = {};
    if(err){
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else{
      response.status = 0;
      response.message = 'Success';
    }
    res.send(response);
  });
}
