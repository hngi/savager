const dotenv = require('dotenv');
dotenv.config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose  = require('mongoose');
const ej=require('ejs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/indexRouter');
const postsRouter = require('./routes/postsRouter');
//var usersRouter = require('./routes/users');
const authentication = require('./controllers/authentication');
const dashboard = require('./controllers/dashboard');
const app = express();

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
});

const sess = {
  secret: process.env.SECRET || 'secret',
  store: sessionStore,
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 30
  }
}

const DB = process.env.DB;
// const port = process.env.PORT || 3000;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.get('/', (req, res) =>{
//   res.render('index');
// })

// console.log('port');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.use('/', indexRouter);
app.use('/users', authentication);


// app.use('/users', usersRouter);

app.use('/posts', postsRouter)
app.get('/dashboard', dashboard);

 // next(createError(404));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, db) => {
  if(!err && db) console.log('DB connected')
})

module.exports = app;
