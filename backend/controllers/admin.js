let db = require('../db.js');

exports.login = function(req, res) {
  let query;
  if(req.body.username.indexOf("@") > 0){
    query = "SELECT * FROM Login WHERE username='" + req.body.username + "' AND password='" + req.body.password + "'";
  } else{
    query = "SELECT * FROM Login WHERE email='" + req.body.username + "' AND password='" + req.body.password + "'";
  }
  db.get().query(query, function(err, rows) {
    let response = {};
    if(err){
      response.status = 4;
      response.message = err.sqlMessage || err.toString();
    } else{
      if(rows.length == 1){
        res.session.username = rows[0].username;
        res.session.email = rows[0].email;
        res.session.u_id = rows[0].u_id;
        response.status = 0;
        response.message = "Success";
      } else{
        response.status = 1;
        response.message = "No user found with those credentials";
      }
    }
    res.send(response);
  });
}

exports.logout = function(req, res) {
  res.session.destroy();
}
