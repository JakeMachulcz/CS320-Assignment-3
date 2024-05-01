/*******************************************************************
 *                           database.js                           *
 *                                                                 *
 * PROGRAMMER: Jake Machulcz                                       *
 * COURSE: CS201                                                   *
 * DATE: 2/26/2024                                                 *
 * REQUIREMENT: Assignment 3                                       *
 *                                                                 *
 * DESCRIPTION:                                                    *
 * The following program defines and instantiates a connection     *
 * between the node.js app and the mySQL database "Assignment3"    *
 *                                                                 *
 * COPYRIGHT: This code is copyright (C) 2023 Jake Machulcz and    *
 * Dean Zeller.                                                    *
 *                                                                 *
 * CREDITS: This code was written with the help of ChatGPT and     *
 * tutorials by CodingStatus.com                                   *
 *                                                                 *
 *******************************************************************/

var mysql = require('mysql2');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'rbs'
});

/**********************************************************
 * METHOD: conn.connect()                                 *
 * DESCRIPTION: tells the user whether an SQL database    *
 *              was successfully connected                *
 * PARAMETERS: function(err)                              *
 * RETURN VALUE: 3 fields to be used for math operations  *
 **********************************************************/

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

module.exports = conn;