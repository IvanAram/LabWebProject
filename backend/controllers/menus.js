var db = require('../db.js');
let nodemailer = require('nodemailer');
var Menu = require('../models/Menu');
var Dish = require('../models/Dish');
var Beverage = require('../models/Beverage');
const secret = require('../config/secret.json').email;

exports.get = function(req, res) {
  if (req.session) {
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
                queryRecursive(false, current, fun);
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
                if(current == data.length - 1) {
                  fun();
                }
                else queryRecursive(true, current + 1, fun);
              }
            });
          }
        }

        for (var i = 0; i < rows.length; i++) {
          var menu = new Menu(rows[i].m_id, rows[i].label, rows[i].description);
          data.push(menu);
        }
        queryRecursive(true, 0, function(){
          response.status = 0;
          response.message = 'Success';
          response.data = data;
          res.send(response);
        });
      }
    });
  }
}

exports.getById = function(req, res) {
  if (req.session) {
    db.get().query('SELECT * FROM Menus WHERE m_id = ' + req.params.id, function(err, rows) {
      var response = {};
      if (err) {
        response.status = 4;
        response.message = err.sqlMessage || err;
      } else {
        response.data = new Menu(rows[0].m_id, rows[0].label, rows[0].description);
        db.get().query('SELECT d.d_id, d.name, d.description, d.c_id FROM MenuDish md, Dishes d WHERE md.m_id=' + response.data.id + ' AND d.d_id = md.d_id', function(err, rows) {
          if (err) {
            response.status = 4;
            response.message = err.sqlMessage || err;
            res.send(response);
          } else{
            for (var i = 0; i < rows.length; i++) {
              response.data.dishes.push(new Dish(rows[i].d_id, rows[i].name, rows[i].description, rows[i].c_id));
            }
            db.get().query('SELECT b.b_id, b.name, b.description, b.alcoholic FROM MenuBeverage mb, Beverages b WHERE mb.m_id=' + response.data.id + ' AND b.b_id = mb.b_id', function(err, rows) {
              if (err) {
                response.status = 4;
                response.message = err.sqlMessage || err;
                res.send(response);
              } else{
                for (var i = 0; i < rows.length; i++) {
                  response.data.beverages.push(new Beverage(rows[i].b_id, rows[i].name, rows[i].description, rows[i].alcoholic));
                }
                response.status = 0;
                response.message = "Success";
                res.send(response);
              }
            });
          }
        });

        response.status = 0;
        response.message = 'Success';
      }
      res.send(response);
    });
  }
}

exports.update = function(req, res) {
  if (req.session) {
    db.get().query("UPDATE Menus SET label='" + req.body.label + "', description='" + req.body.description + "' WHERE m_id=" + req.params.id, function(err, rows) {
      let response = {};
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
  if (req.session) {
    db.get().query("INSERT INTO Menus (label, description) VALUES ('" + req.body.label + "','" + req.body.description + "')", function(err, rows) {
      let response = {};
      if(err){
        response.status = 4;
        response.message = err.sqlMessage || err;
        res.send(response);
      } else{
        response.status = 0;
        response.message = 'Success';
        response.data = rows.insertId;
        res.send(response);
        // let transporter = nodemailer.createTransport("SMTP",{
        //   service: 'Gmail',
        //   auth: {
        //     user: secret.user,
        //     pass: secret.password
        //   }
        // });
        // let mailOptions = {
        //   from: 'noreply@exists.not',
        //   to: req.session.email,
        //   subject: 'You added a new menu!',
        //   html: '<h1>Hello Admin!</h1>' +
        //   '<p>You just added a menu to the menu list brah!</p>' +
        //   '<p>That was amazing...</p>'
        // }
        // transporter.sendMail(mailOptions, (e, info) => {
        //   if (e) {
        //     response.status = 1;
        //     console.log(e);
        //     response.message = "Created menu but email was not send";
        //   } else{
        //     response.status = 0;
        //     response.message = 'Success';
        //     response.data = rows.insertId;
        //   }
        //   res.send(response);
        // });
      }
    });
  }
}

exports.addBeverage = function(req, res) {
  if (req.session) {
    db.get().query("INSERT INTO MenuBeverage (m_id, b_id) VALUES (" + req.body.m_id + "," + req.body.b_id + ")", function(err, rows) {
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
}

exports.addDish = function(req, res) {
  if (req.session) {
    db.get().query("INSERT INTO MenuDish (m_id, d_id) VALUES (" + req.body.m_id + "," + req.body.d_id + ")", function(err, rows) {
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
}

exports.deleteBeverage = function(req, res) {
  if (req.session) {
    db.get().query("DELETE FROM MenuBeverage WHERE m_id=" + req.body.m_id + " AND b_id=" + req.body.b_id, function(err, rows) {
      let response = {};
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
}

exports.deleteDish = function(req, res){
  if (req.session) {
    db.get().query("DELETE FROM MenuDish WHERE m_id=" + req.body.m_id + " AND d_id=" + req.body.d_id, function(err, rows) {
      let response = {};
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
}

exports.delete = function(req, res) {
  if (req.session) {
    db.get().query('DELETE FROM MenuBeverage WHERE m_id = ' + req.params.id, function(err, rows) {
      let response = {};
      if (err) {
        response.status = 4;
        response.message = err.sqlMessage || err;
        res.send(response);
      } else {
        db.get().query('DELETE FROM MenuDish WHERE m_id = ' + req.params.id, function(err, rows) {
          if (err) {
            response.status = 4;
            response.message = err.sqlMessage || err;
            res.send(response);
          } else {
            db.get().query("DELETE FROM Menus WHERE m_id = " + req.params.id, function(err, rows) {
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
        });
      }
    });
  }
}
