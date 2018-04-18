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
