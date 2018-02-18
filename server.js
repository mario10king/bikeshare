const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./apiTest');
const app = express();
const cons = require('consolidate');
const handlebars = require('handlebars');
require('dotenv').config();

app.use(bodyParser.urlencoded());
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }));

app.post('/', function(req, res) {
  controller(req.body.origin, req.body.destination).then(function(response) {
    var walkingOrigin = req.body.origin;
    var walkingDestination = req.body.destination;
    var origin = response[0];
    var destination = response[1];
    res.render('map.html', {
      key: process.env.GOOGLE_MAP_API_KEY,
      walkingOrigin: walkingOrigin,
      walkingDestination: walkingDestination,
      origin: origin,
      destination: destination,
      root: __dirname,
    });
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
