const fetch = require('node-fetch');

fetch('http://santamonicabikeshare.com/opendata/station_information.json')
  .then(function(response){return response.json()})
  .then(function(response){console.log(response.data.stations[1])})

