var db = require('../db.js');
var Category = require('../models/Category');

exports.getAll = function(req, res) {
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
