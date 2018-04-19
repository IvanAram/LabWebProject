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

exports.update = function(req, res) {
  let query = "";
  if(req.body.name){
    query += "name='" + req.body.name + "' ";
  }
  if(req.body.description){
    if(query != ""){
      query += "AND ";
    }
    query += "description='" + req.body.description + "' ";
  }
  if(req.body.d_id){
    if(query != ""){
      query += "AND ";
    }
    query += "d_id=" + req.body.d_id + " ";
  }
  if(query != ""){
    db.get().query("UPDATE Dishes SET " + query + "WHERE d_id=" + req.body.id, function(err, rows) {
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

exports.create = function(req, res) {
  db.get().query("INSERT INTO Dishes (name, description, d_id) VALUES ('" + req.body.name + "','" + req.body.description + "'," + req.body.d_id + ")", function(err, rows) {
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
  db.get().query("DELETE FROM Dishes WHERE d_id = " + req.body.id, function(err, rows) {
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
