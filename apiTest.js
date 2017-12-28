const fetch = require("node-fetch");
const googleAPI = require("./googleApi");

fetch("http://santamonicabikeshare.com/opendata/station_information.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    var data = [];
    response.data.stations.forEach(function(station) {
      data.push({id: station.station_id, address: station.lat + "," + station.lon});
    });
    googleAPI(data).then(function (id){
      response.data.stations.forEach(function(station) {
        if(id === station.station_id){
          console.log(station)
        }
      });
     })
   })
