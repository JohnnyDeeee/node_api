var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');
var config = require('./config/config');
// Utils
var logging = require('./util/logging');
// Routes
var index = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');
var actors = require('./routes/actors');
var movies = require('./routes/movies');

var app = express();

// Connect to DB
mongoose.Promise = global.Promise; // Configure mongoose to use native Promise library
mongoose.connect('mongodb://127.0.0.1/' + config.DB_NAME, {
  useMongoClient: true
}).then(db => {
  logging.log("Connected to MongoDB!");
}).catch(err => {
  logging.error("Could not connect to MongoDB!");
  logging.log("Server is terminating...");
  process.exit(0);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => { // CORS middleware
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use((req, res, next) => { // JWT Verify middleware
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.SECRET_KEY, (err, decode) => {
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// Routes
app.use('/', index);
app.use('/login', login);
app.use('/users', users);
app.use('/actors', actors);
app.use('/movies', movies);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
