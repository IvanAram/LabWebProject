var db = require('../db.js');
var Beverage = require('../models/Beverage');

exports.get = function(req, res) {
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

// exports.getById = function(req, res) {
//   db.get().query('SELECT * FROM Beverages WHERE b_id = ' + req.params.id, function(err, rows) {
//     var response = {};
//     if (err) {
//       response.status = 4;
//       response.message = err.sqlMessage || err;
//     } else {
//       response.data = new Beverage(rows[0].b_id, rows[0].name, rows[0].description, rows[0].alcoholic);
//       response.status = 0;
//       response.message = 'Success';
//     }
//     res.send(response);
//   });
// }

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
  if(req.body.alcoholic){
    if(query != ""){
      query += "AND ";
    }
    query += "alcoholic=" + req.body.alcoholic + "' ";
  }
  if(query != ""){
    db.get().query("UPDATE Beverages SET " + query + "WHERE b_id=" + req.body.id, function(err, rows) {
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
  // PREGUNTAR SI NECESITAMOS VALIDACIONES
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

exports.delete = function(req, res) {
  db.get().query('DELETE FROM MenuBeverages WHERE b_id = ' + req.body.id, function(err, rows) {
    var response = {};
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
