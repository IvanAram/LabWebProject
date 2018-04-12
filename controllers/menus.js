var db = require('../db.js');
var Menu = require('../models/Menu');

exports.getAll = function(req, res) {
  db.get().query('QUERY', function(err, rows) {
    var response = {};
    var data = [];
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
    } else {
      for (var i = 0; i < rows.length; i++) {
        var menu = new Menu(rows[i].d_id, rows[i].name, rows[i].description, rows[i].c_id);
        data.push(menu);
      }
      response.status = 0;
      response.message = 'Success';
      response.data = data;
    }
    res.send(response);
  });
}
