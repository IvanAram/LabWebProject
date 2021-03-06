var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var db = require('./db.js');

var loginRouter = require('./routes/login');
var beveragesRouter = require('./routes/beverages');
var categoriesRouter = require('./routes/categories');
var dishesRouter = require('./routes/dishes');
var menusRouter = require('./routes/menus');
var tablesRouter = require('./routes/tables');
var waitersRouter = require('./routes/waiters');

var app = express();

db.connect(function(err){
	if(err){
		console.log("NOT CONNECTED");
		process.exit(1);
	}
	else{
		console.log("CONNECTED SUCCESSFULLY")
	}
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Session configuration (handled by express-session module)
app.use(session({
	cookie:{
		secure: false, // CHANGE THIS TO TRUE IF HOST SERVER IN HTTPS (NOT HTTP) // NORMALLY WHEN IN PRODUCTION
		maxAge: 24 * 60 * 60 * 1000 // 1 day
	},
	resave: false,
	saveUninitialized: false, // DUNNO IF THIS IS GOOD
	secret: "lab web project secret"
}));

app.use('/login', loginRouter);
app.use('/beverages', beveragesRouter);
app.use('/categories', categoriesRouter);
app.use('/dishes', dishesRouter);
app.use('/menus', menusRouter);
app.use('/tables', tablesRouter);
app.use('/waiters', waitersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	var response = {
		status: err.status || 500,
		message: err.message,
		stack: err.stack
	}
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.send(response);
});

module.exports = app;
