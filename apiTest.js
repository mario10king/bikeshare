const fetch = require("node-fetch");
const googleAPI = require("./googleApi");

fetch("http://santamonicabikeshare.com/opendata/station_information.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    var data = [];
    response.data.stations.forEach(function(station) {
      data.push(station.lat + "," + station.lon);
    });
    googleAPI(data);
  });
