const express = require('express')
const bodyParser = require('body-parser')
const controller = require("./apiTest")
const app = express()

app.use(bodyParser.urlencoded())

app.get('/', (req, res) => res.sendFile('index.html',  {root: __dirname }))

app.post('/', function(req, res) {
  controller(req.body.origin, req.body.destination).then(
  function(response){
    console.log(response)
    //res.render('map.html',  {origin: response[0], destination: response[1], root: __dirname })
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
