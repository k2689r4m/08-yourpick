var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const auth = require('./middleware/auth');
var router = express.Router();
const history = require('connect-history-api-fallback'); 

var bodyParser = require('body-parser');

require("dotenv").config();

// var mainRouter = require('./routes/main');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var clientRouter = require('./routes/client');
var usersRouter = require('./routes/users');

var app = express();
app.use(bodyParser.json({limit: '35mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '35mb',
    parameterLimit: 50000,
  }),
);

const db = require('./database/connect/config');
// db.connect();
db.getConnection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
// app.use(cors({origin: process.env.SERVER_HOST }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(history()); //여기
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', mainRouter);
app.use('/api',auth.verifyToken, indexRouter);
app.use('/admin',auth.verifyToken, adminRouter);
app.use('/user', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

