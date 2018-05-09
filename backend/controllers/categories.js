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

exports.getById = function(req, res) {
  db.get().query('SELECT * FROM Categories WHERE c_id = ' + req.params.id, function(err, rows) {
    var response = {};
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else {
      response.data = new Category(rows[0].c_id, rows[0].label);
      response.status = 0;
      response.message = 'Success';
    }
    res.send(response);
  });
}

exports.update = function(req, res) {
  db.get().query('UPDATE Categories SET label = "' + req.body.label + '" WHERE c_id=' + req.params.id, function(err, rows) {
    let response = {};
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

exports.create = function(req, res) {
  db.get().query('INSERT INTO Categories (label) VALUES ("' + req.body.label + '")', function(err, rows) {
    let response = {};
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
  db.get().query('SELECT d_id FROM Dishes WHERE c_id = ' + req.params.id, function(err, rows) {
    let response = {};
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
      res.send(response);
    } else {
      if(rows.length){
        let dishes = [];
        for (var i = 0; i < rows.length; i++) {
          dishes.push(rows[i].d_id);
        }
        function queryRecursive(current, fun){
          db.get().query('DELETE FROM MenuDish WHERE d_id=' + data[current], function(err, rows) {
            if (err) {
              response.status = 4;
              response.message = err.sqlMessage || err;
              res.send(response);
            } else{
              if(current == dishes.length - 1){
                fun();
              } else{
                queryRecursive(current + 1, fun);
              }
            }
          });
        }
        queryRecursive(0, function() {
          db.get().query("DELETE FROM Dishes WHERE c_id = " + req.params.id, function(err, rows) {
            if(err){
              response.status = 4;
              response.message = err.sqlMessage || err;
              res.send(response);
            } else{
              db.get().query('DELETE FROM Categories WHERE c_id = ' + req.params.id, function(err, rows) {
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
          });
        });

      } else{
        db.get().query('DELETE FROM Categories WHERE c_id = ' + req.params.id, function(err, rows) {
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
    }
  });
}
