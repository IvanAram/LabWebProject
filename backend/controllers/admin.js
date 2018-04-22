var db = require('../db.js');

exports.login = function(req, res) {
  db.get().query("SELECT * FROM Login WHERE username='" + req.body.username + "' AND password='" + req.body.password + "'", function(err, rows) {
    let response = {};
    if(err){
      response.status = 4;
      response.message = err.sqlMessage || err.toString();
    } else{
      if(rows == 1){
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
