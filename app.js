'use strict';
//require('dotenv').config();

// let port = process.env.PORT;
// let host = process.env.HOST;
const express     = require('express');
const bodyParser  = require('body-parser');

const app = express();

/* security measures */
// const helmet = require('helmet');
// const ninetyDaysInSeconds = 90*24*60*60;
// /* parent helmet */
// app.use(helmet({
//   frameguard: {        //configure
//     action: "deny" 
//   },
//   hsts: {
//     maxAge: ninetyDaysInSeconds,
//     preload: false,
//   },
//   dnsPrefetchControl: {
//     allow: true,
//   },
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'"],
//       styleSrc: ["'self'"],
//     },
//   },
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });


//404 Not Found Middleware
app.use(function(req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
  });

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Local Weather is listening on port ' + listener.address().port);
  });
  