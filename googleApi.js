const fetch = require("node-fetch");
require("dotenv").config();

module.exports = function(data) {
  var origin = "9245+W+Venice+Blvd+Los+Angeles+CA+90034";//random address
  var newData = data.slice(15,25) //slice to get a subset of data to not go over api limit for testing
  var destination = newData.map(function(station){ 
    return station.address
  }).join("|");
  var apiKey = process.env.GOOGLE_MAP_API_KEY;

  return fetch(
    "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
      origin +
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
     return(newData[shortestElement].id)
    });
};
