// *** start of app.tsx for server-side *** //
// TODO: review again express documentation
// https://expressjs.com/en/advanced/pm.html  -- process manager for production run scripts as daemons
// https://expressjs.com/en/advanced/best-practice-performance.html -- performance for post-production
// https://expressjs.com/en/advanced/best-practice-security.html -- security post-production
// https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html -- health check and server shutdown/restart post-production

// import express from "express";
// import { connectToMongoDB } from '../services/connect-db.service'
// all routers to follow
// import { userRouter } from '../routes/user.router'
// *** Libraries To Consider *** //
// http-errors
// path
// cookie-parser // will have to consider security for module or how it will coincide with express.cookie and express.cookieSession module
// morgan
// dotenv // config all
// express.urlencoded

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
require('dotenv').config();

var bodyParser = require('body-parser');
var cache = require('js-cache');
var multer = require('multer');

var app = express();

// TODO: define port for server environment

// TODO: define http server

// TODO: define listener with port

// const redisClient = require('./config/redis')

// var admin = require("firebase-admin");

// var serviceAccount = require("./config/Service_Account.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

const connect = require('./controllers/connect-mongodb')

// connect.catch(console.dir);

connect.then(() => {
    console.log('Connected to MongoDB');
}, (error: any) => { console.log(error); })

app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    //res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
    return next();
  }
});



app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(multer({ dest: './uploads/',
// rename: function (fieldname, filename) {
//   return filename+Date.now();
// },
// onFileUploadStart: function (file) {
//   console.log(file.originalname + ' is starting ...')
// },
// onFileUploadComplete: function (file) {
//   console.log(file.fieldname + ' uploaded to  ' + file.path)
//   done=true;
// }
// }));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error ('Not Found');
//   err.status = 404;
//   err.name = 404;
//   next(err);
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page HTML
  res.status(err.status || 500);
  console.log('ERROR: ', err);
});

/// error handlers
// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//       res.status(err.status || 500);
//       res.render('error', {
//           message: err.message,
//           error: err
//       });
//   });
//   }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

module.exports = app;
