const fetch = require('node-fetch');
require('dotenv').config()

var origin = ''
var destination = ''
var apiKey = process.env.GOOGLE_MAP_API_KEY;

fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+origin+'&destinations='+destination+'&key='+apiKey+'&mode=walking')
  .then(function(response){return response.json()})
  .then(function(response){response.rows.forEach(
    function(x){console.log(x.elements)}
  )})


