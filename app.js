
// const dotenv = require('dotenv');
// dotenv.config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose  = require('mongoose');


const indexRouter = require('./routes/indexRouter');
const postsRouter = require('./routes/postsRouter');
// var usersRouter = require('./routes/users');

const app = express();

const DB = process.env.DB;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.get('/', (req, res) =>{
//   res.render('index');
// })

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
// console.log('port');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);



// app.use('/users', usersRouter);

app.use('/posts', postsRouter)

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

// mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, db) => {
//   if(!err && db) console.log('DB connected')
// })

module.exports = app;
