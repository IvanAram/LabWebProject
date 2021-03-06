var db = require('../db.js');
var Beverage = require('../models/Beverage');

exports.get = function(req, res) {
  if(req.session){
    db.get().query('SELECT * FROM Beverages', function(err, rows) {
      var response = {};
      var data = [];
      if (err) {
        response.status = 4;
        response.message = err.sqlMessage || err;
      } else {
        for (var i = 0; i < rows.length; i++) {
          var category = new Beverage(rows[i].b_id, rows[i].name, rows[i].description, rows[i].alcoholic);
          data.push(category);
        }
        response.status = 0;
        response.message = 'Success';
        response.data = data;
      }
      res.send(response);
    });
  }
}

exports.getById = function(req, res) {
  if (req.session) {
    db.get().query('SELECT * FROM Beverages WHERE b_id = ' + req.params.id, function(err, rows) {
      var response = {};
      if (err) {
        response.status = 4;
        response.message = err.sqlMessage || err;
      } else {
        response.data = new Beverage(rows[0].b_id, rows[0].name, rows[0].description, rows[0].alcoholic);
        response.status = 0;
        response.message = 'Success';
      }
      res.send(response);
    });
  }
}

exports.update = function(req, res) {
  if (req.session) {
    db.get().query("UPDATE Beverages SET name='" + req.body.name + "', description='" + req.body.description + "', alcoholic="+req.body.alcoholic + " WHERE b_id=" + req.params.id, function(err, rows) {
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
}

exports.create = function(req, res){
  if (req.session) {
    db.get().query('INSERT INTO Beverages (name, description, alcoholic) VALUES ("'+ req.body.name + '","' + req.body.description + '","' + req.body.alcoholic + '")', function(err, rows) {
      var response = {};
      if(err){
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

exports.delete = function(req, res) {
  if (req.session) {
    db.get().query('DELETE FROM MenuBeverage WHERE b_id = ' + req.params.id, function(err, rows) {
      let response = {};
      if (err) {
        response.status = 4;
        response.message = err.sqlMessage || err;
        res.send(response);
      } else {
        db.get().query('DELETE FROM Beverages WHERE b_id = ' + req.params.id, function(err, rows) {
          if(err){
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
  }
}
