var db = require('../db.js');
var Beverage = require('../models/Beverage');

exports.getAll = function(req, res) {
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
