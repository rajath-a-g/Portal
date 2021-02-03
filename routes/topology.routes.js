module.exports = app => {
    const topology = require("../controllers/Topology.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all topology information for given overlayid and interval
    //Syntax: http://localhost:3000/topology?overlayid=overlayId&interval=intervalId
    router.get("/Topology", topology.findTopology);
  
  
    app.use('/', router);
  };