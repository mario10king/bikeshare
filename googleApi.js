const fetch = require("node-fetch");
require("dotenv").config();

module.exports = function(origin, finalDestination, data) {
  var origin = origin.split(" ").join("+");
  var finalDestination= finalDestination.split(" ").join("+");
  var newData = data.slice(15,25) //slice to get a subset of data to not go over api limit for testing
  var destination = newData.map(function(station){ 
    return station.address
  }).join("|");
  var apiKey = process.env.GOOGLE_MAP_API_KEY;

  return fetch(
    "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
      origin + "|" + finalDestination +
      "&destinations=" +
      destination +
      "&key=" +
      apiKey +
      "&mode=walking"
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      var shortest;
      var shortestElement;
      response.rows[0].elements.forEach(function(result, index) { 
      if(result.status === 'OK'){
        if (shortest === undefined){
          shortest = result.duration.value 
          shortestElement = index
        }else if(result.duration.value < shortest){
          shortest = result.duration.value 
          shortestElement = index 
        }
     } 
     });
var shortestDestination;
      var shortestElementDestination;
      response.rows[1].elements.forEach(function(result, index) { 
      if(result.status === 'OK'){
        if (shortestDestination === undefined){
          shortestDestination = result.duration.value 
          shortestElementDestinaion = index
        }else if(result.duration.value < shortestDestination){
          shortestDestination = result.duration.value 
          shortestElementDestination = index 
        }
     } 
     });
     var closestOrigin = newData[shortestElement].id
     var closestDestination = newData[shortestElementDestination].id 
     return([closestOrigin, closestDestination])
    });
};
