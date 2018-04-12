var db = require('../db.js');
var Category = require('../models/category');

exports.getAll = function(req, res) {
  db.get().query('SELECT * FROM Categories', function(err, rows) {
    var response = {};
    var data = [];
    if (err) {
      response.status = 4;
      response.message = err;
    } else {
      if (rows) {
        for (var i = 0; i < rows.length; i++) {
          var category = new Category(rows[i].c_id, rows[i].label);
          data.push(category);
        }
        response.status = 0;
        response.message = 'Success';
        response.data = data;
      } else {
        response.status = 4;
        response.message = 'Database error.';
      }
    }
    res.send(response);
  });
}
