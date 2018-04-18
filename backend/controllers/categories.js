var db = require('../db.js');
var Category = require('../models/Category');

exports.get = function(req, res) {
  db.get().query('SELECT * FROM Categories', function(err, rows) {
    var response = {};
    var data = [];
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else {
      for (var i = 0; i < rows.length; i++) {
        var category = new Category(rows[i].c_id, rows[i].label);
        data.push(category);
      }
      response.status = 0;
      response.message = 'Success';
      response.data = data;
    }
    res.send(response);
  });
}

exports.update = function(req, res) {
  db.get().query('UPDATE Categories SET label = "' + req.body.label + '" WHERE c_id=' + req.body.id, function(err, rows) {
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else{
      response.status = 0;
      response.message = "Success";
    }
    res.send(response);
  });t
}

exports.create = function(req, res) {
  db.get().query('INSERT INTO Categories (label) VALUES ("' + req.body.label + '")', function(err, rows) {
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else{
      response.status = 0;
      response.message = "Success";
    }
    res.send(response);
  });
}

exports.delete = function(req, res) {
  db.get().query('DELETE FROM Categories WHERE c_id = ' + req.body.id, function(err, rows) {
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else{
      response.status = 0;
      response.message = "Success";
    }
    res.send(response);
  });
}
