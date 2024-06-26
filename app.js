/*******************************************************************
 *                             app.js                              *
 *                                                                 *
 * PROGRAMMER: Jake Machulcz                                       *
 * COURSE: CS201                                                   *
 * DATE: 2/26/2024                                                 *
 * REQUIREMENT: Assignment 3                                       *
 *                                                                 *
 * DESCRIPTION:                                                    *
 * The following program configures the website, establishes       *
 * dependencies, and defines errors for the app.                   *
 *                                                                 *
 * COPYRIGHT: This code is copyright (C) 2023 Jake Machulcz and    *
 * Dean Zeller.                                                    *
 *                                                                 *
 * CREDITS: This code was written with the help of ChatGPT and     *
 * tutorials by CodingStatus.com                                   *
 *                                                                 *
 *******************************************************************/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/math', (req, res) => {
  res.render('math');
});
app.get('/math-results', (req, res) => {
  res.render('math-results');
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;