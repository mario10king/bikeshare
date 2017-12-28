const fetch = require("node-fetch");
const googleAPI = require("./googleApi");

function controller(origin, destination){
  getStationsInfo.then(function(info){
    var formattedStations = formatStations(info)
    googleAPI(origin, destination, formattedStations).then(function(ids){
      console.log(getAddresses(ids, info))
    })
  })
}

var getStationsInfo = fetch("http://santamonicabikeshare.com/opendata/station_information.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    return response
  })

function getAddresses(ids, info){
   var originStation;
   var destinationStation;
   info.data.stations.forEach(function(station) {
     if(ids[0] === station.station_id){
       originStation = station.address
     }
     if(ids[1] === station.station_id){
       destinationStation = station.address
     }
   });
   return [originStation, destinationStation]
}

function formatStations(info){
    return info.data.stations.map(function(station) {
      return {id: station.station_id, address: station.lat + "," + station.lon};
    });
}

controller("242 25th St Santa Monica CA 90402", "1210 Ozone Ave Santa Monica CA 90405")//random addresses
