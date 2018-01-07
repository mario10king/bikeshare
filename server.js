const express = require('express')
const bodyParser = require('body-parser')
const controller = require("./apiTest")
const app = express()
const cons = require('consolidate')
const handlebars = require('handlebars')

app.use(bodyParser.urlencoded())
app.engine('html', cons.handlebars)
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => res.sendFile('index.html',  {root: __dirname }))

app.post('/', function(req, res) {
  controller(req.body.origin, req.body.destination).then(
  function(response){
    res.render('test.html',  {origin: response[0], destination: response[1], root: __dirname })
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
