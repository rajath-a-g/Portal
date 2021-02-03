const express = require('express')
const bodyParser = require('body-parser');
const {MongoDBImpl} = require('../db/MongoDBImpl')
var router = require("express").Router();

const app = express()
const port = 3000
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var Data = {}
//As the object dbInstance is built, Evio db is connected from constructor
var dbInstance = new MongoDBImpl('mongodb://localhost:27017/Evio', 'Evio')

app.get('/', (req, res) => {
  res.json({ message: "Welcome to Visualizer application." });
})

//routing logic for GET all intervals
require("../routes/overlays.routes")(app);
//routing logic for GET overlay information given interval
require("../routes/topology.routes")(app);

app.put('/EVIO/*', (req, res) => {
    Data[Date.now()] = req.body
    res.sendStatus(200)
})

// setInterval(function(){
//     var timeStamp = Date.now()
//     var dataCopy = Data
//     console.log(dataCopy)
//     Data = {}
//     dbInstance.insertInto(dataCopy, timeStamp)
// }, 30000)
// set port, listen for requests

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})