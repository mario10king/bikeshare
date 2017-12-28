const express = require('express')
const app = express()

app.get('/', (req, res) => res.sendFile('index.html',  {root: __dirname }))
app.post('/', (req, res) => res.sendFile('map.html',  {root: __dirname }))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
