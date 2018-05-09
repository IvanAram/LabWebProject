const db = require('../db.js');
const Dish = require('../models/Dish');

exports.get = function(req, res) {
  db.get().query('SELECT * FROM Dishes', function(err, rows) {
    let response = {};
    let data = [];
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else {
      for (var i = 0; i < rows.length; i++) {
        let dish = new Dish(rows[i].d_id, rows[i].name, rows[i].description, rows[i].c_id);
        data.push(dish);
      }
      response.status = 0;
      response.message = 'Success';
      response.data = data;
    }
    res.send(response);
  });
}

exports.getById = function(req, res) {
  db.get().query('SELECT * FROM Dishes WHERE d_id = ' + req.params.id, function(err, rows) {
    var response = {};
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else {
      response.data = new Dish(rows[0].d_id, rows[0].name, rows[0].description, rows[0].c_id);
      response.status = 0;
      response.message = 'Success';
    }
    res.send(response);
  });
}

exports.update = function(req, res) {
  db.get().query("UPDATE Dishes SET name='" + req.body.name + "', description='" + req.body.description + "', c_id="+req.body.c_id + " WHERE d_id=" + req.params.id, function(err, rows) {
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
  db.get().query("INSERT INTO Dishes (name, description, c_id) VALUES ('" + req.body.name + "','" + req.body.description + "'," + req.body.c_id + ")", function(err, rows) {
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
  db.get().query('DELETE FROM MenuDish WHERE d_id = ' + req.params.id, function(err, rows) {
    let response = {};
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
      res.send(response);
    } else {
      db.get().query("DELETE FROM Dishes WHERE d_id = " + req.params.id, function(err, rows) {
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
  });
}
