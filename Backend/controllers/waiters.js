var db = require('../db.js');
var Waiter = require('../models/Waiter');

exports.getAll = function(req, res) {
  db.get().query('SELECT * FROM Waiters', function(err, rows) {
    var response = {};
    var data = [];
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else {
      for (var i = 0; i < rows.length; i++) {
        var waiter = new Waiter(rows[i].w_id, rows[i].name);
        data.push(waiter);
      }
      response.status = 0;
      response.message = 'Success';
      response.data = data;
    }
    res.send(response);
  });
}
