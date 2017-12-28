const fetch = require("node-fetch");
require("dotenv").config();

module.exports = function(data) {
  var origin = "9245+W+Venice+Blvd+Los+Angeles+CA+90034";//random address
  var destination = data.join("|");
  var apiKey = process.env.GOOGLE_MAP_API_KEY;

  fetch(
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
      response.rows.forEach(function(result) {
        console.log(result.elements);
      });
    });
};
