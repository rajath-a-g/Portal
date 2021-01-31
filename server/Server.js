const express = require('express')
const bodyParser = require('body-parser');
const {MongoDBImpl} = require('../db/MongoDBImpl')

const app = express()
const port = 3000

app.use(bodyParser.json());

var Data = {}

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.put('/EVIO/*', (req, res) => {
    Data[Date.now()] = req.body
    res.sendStatus(200)
})

setInterval(function(){
    var timeStamp = Date.now()
    var dataCopy = Data
    console.log(dataCopy)
    Data = {}
    var dbInstance = new MongoDBImpl('mongodb://localhost:27017/Evio', 'Evio')
    dbInstance.insertInto(dataCopy, timeStamp)
}, 30000)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})