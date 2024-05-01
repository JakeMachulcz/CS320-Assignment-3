/*******************************************************************
 *                            users.js                             *
 *                                                                 *
 * PROGRAMMER: Jake Machulcz                                       *
 * COURSE: CS201                                                   *
 * DATE: 2/26/2024                                                 *
 * REQUIREMENT: Assignment 3                                       *
 *                                                                 *
 * DESCRIPTION:                                                    *
 * The following program establishes the views of the website,     *
 * both utilizing SQL integration from database.js and arithmetic  *
 * functions, and defines the handling of HTTP requests.           *
 *                                                                 *
 * COPYRIGHT: This code is copyright (C) 2023 Jake Machulcz and    *
 * Dean Zeller.                                                    *
 *                                                                 *
 * CREDITS: This code was written with the help of ChatGPT and     *
 * tutorials by CodingStatus.com                                   *
 *                                                                 *
 *******************************************************************/

const express = require('express');
const router = express.Router();
const db = require('../database');
var bodyParser = require('body-parser');
var mysql = require('mysql');

/**********************************************************
 * METHOD: router.get()                                   *
 * DESCRIPTION: displays the entire 'Logins' table        *
 * PARAMETERS: '/', (req, res)                            *
 * RETURN VALUE: the full 'Logins' table                  *
 **********************************************************/

router.get('/search', (req, res) => {
  const sql = 'SELECT * FROM Logins';
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data });
  });
});

/**********************************************************
 * METHOD: router.post()                                  *
 * DESCRIPTION: shows only search matches in the 'Logins' *
 *              table                                     *
 * PARAMETERS: '/search', (req, res)                      *
 * RETURN VALUE: search matches in the 'Logins' table     *
 **********************************************************/

router.post('/search-results', (req, res) => {
  const userInput = req.body.userInput;

  const sql = 'SELECT * FROM Logins WHERE Username LIKE ?';
  db.query(sql, [`%${userInput}%`], (err, data) => {
    if (err) throw err;
    res.render('search-results', { title: 'Search Results', userData: data });
  });
});

/**********************************************************
 * METHOD: router.get()                                   *
 * DESCRIPTION: displays 3 fields for the user to enter   *
 *              numbers and a submit button               *
 * PARAMETERS: '/math, (req, res)                         *
 * RETURN VALUE: 3 fields to be used for math operations  *
 **********************************************************/

router.get('/', (req, res) => {
  res.render('math');
});

/**********************************************************
 * METHOD: router.post()                                  *
 * DESCRIPTION: performs addition and multiplication on   *
 *              user inputs from '/math'                  *
 * PARAMETERS: '/math, (req, res)                         *
 * RETURN VALUE: summary and results of the operations    *
 **********************************************************/

router.post('/math-results', (req, res) => {
  var num1 = parseFloat(req.body.num1);
  var num2 = parseFloat(req.body.num2);
  var num3 = parseFloat(req.body.num3);
  var mult = num1 * num2 * num3;
  var sum = num1 + num2 + num3;

  var multResults = num1 + ' * ' + num2 + ' * ' + num3 + ' = ' + mult;
  var sumResults = num1 + ' + ' + num2 + ' + ' + num3 + ' = ' + sum;

  res.render('math-results', {  multResults, sumResults })
});

module.exports = router;