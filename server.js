'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

/**
 * Create the Express application.
 */
var app = express();

/**
 * Application settings.
 */
app.set('trust proxy',true);
app.use(express.static('public'));

/**
 * Stormpath initialization.
 */

console.log('Initializing Stormpath');

app.use(stormpath.init(app, {
  expand: {
    customData: true
  },
  produces: ['application/json']
}));


app.on('stormpath.ready',function () {
  console.log('Stormpath Ready');
});

/**
 * Start the web server.
 */
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server listening on http://localhost:' + port);
});

