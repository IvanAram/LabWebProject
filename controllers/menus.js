var db = require('../db.js');
var Menu = require('../models/Menu');
var Dish = require('../models/Dish');
var Beverage = require('../models/Beverage');

exports.getAll = function(req, res) {
  db.get().query('SELECT * FROM Menus', function(err, rows) {
    var response = {};
    var data = [];
    if (err) {
      response.status = 4;
      response.message = err.sqlMessage || err;
      res.send(response);
    } else {

      function queryRecursive(dishes, current, fun){
        if(dishes){
          db.get().query('SELECT d.d_id, d.name, d.description, d.c_id FROM MenuDish md, Dishes d WHERE md.m_id=' + data[current].id + ' AND d.d_id = md.d_id', function(err, rows) {
            if (err) {
              response.status = 4;
              response.message = err.sqlMessage || err;
              res.send(response);
            } else{
              for (var i = 0; i < rows.length; i++) {
                data[current].dishes.push(new Dish(rows[i].d_id, rows[i].name, rows[i].description, rows[i].c_id));
              }
              return queryRecursive(false, current, fun);
            }
          });
        } else{
          db.get().query('SELECT b.b_id, b.name, b.description, b.alcoholic FROM MenuBeverage mb, Beverages b WHERE mb.m_id=' + data[current].id + ' AND b.b_id = mb.b_id', function(err, rows) {
            if (err) {
              response.status = 4;
              response.message = err.sqlMessage || err;
              res.send(response);
            } else{
              for (var i = 0; i < rows.length; i++) {
                data[current].beverages.push(new Beverage(rows[i].b_id, rows[i].name, rows[i].description, rows[i].alcoholic));
              }
              if(current == data.length - 1) return fun();
              else return queryRecursive(true, current + 1, fun);
            }
          });
        }
      }

      for (var i = 0; i < rows.length; i++) {
        var menu = new Menu(rows[i].m_id, rows[i].label, rows[i].description);
        data.push(menu);
      }
      for (var i = 0; i < data.length; i++) {
        queryRecursive(true, 0, function(){
          response.status = 0;
          response.message = 'Success';
          response.data = data;
          res.send(response);
        });
      }
    }

  });
}
