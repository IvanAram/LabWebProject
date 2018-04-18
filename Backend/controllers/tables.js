var db = require('../db.js');
var Table = require('../models/Table');

exports.getAll = function(req, res) {
  db.get().query('SELECT * FROM Tables', function(err, rows) {
    var response = {};
    var data = [];
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else {
      for (var i = 0; i < rows.length; i++) {
        var table = new Table(rows[i].t_id, rows[i].seats);
        data.push(table);
      }
      response.status = 0;
      response.message = 'Success';
      response.data = data;
    }
    res.send(response);
  });
}
