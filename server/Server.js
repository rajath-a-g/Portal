const express = require('express')
const bodyParser = require('body-parser');
const {MongoDBImpl} = require('../db/MongoDBImpl')
const overlays = require("../controllers/Overlays.controller.js");
const topology = require("../controllers/Topology.controller.js");
const dotenv = require('dotenv')

const app = express()
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config()

var Data = {}
//As the object dbInstance is built, Evio db is connected from constructor
if (process.env.DB == "mongo")
var dbInstance = new MongoDBImpl('mongodb://localhost:27017/Evio', 'Evio')
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Visualizer application." });
})

//routing logic for GET all intervals
//Syntax: http://localhost:3000/intervals
app.get('/Intervals', (req, res) => overlays.findAllIntervals(req, res, dbInstance));

//routing logic for GET overlay information given interval
//Syntax: http://localhost:3000/overlays?interval=intervalId 
app.get('/Overlays', (req, res) => overlays.findOverlays(req, res, dbInstance));

//routing logic for GET topology information given overlayid and interval
//Syntax: http://localhost:3000/topology?overlayid=overlayId&interval=intervalId
app.get('/Topology', (req, res) => topology.findTopology(req, res, dbInstance));

//require("../routes/topology.routes")(app);

app.put('/EVIO/*', (req, res) => {
    Data[Date.now()] = req.body
    res.sendStatus(200)
})

setInterval(function(){
    var timeStamp = Date.now()
    var dataCopy = Data;
    //console.log(dataCopy)
    Data = {}
    dbInstance.insertInto(dataCopy, timeStamp)
}, 30000)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})