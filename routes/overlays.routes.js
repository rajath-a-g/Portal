module.exports = app => {
    const overlays = require("../controllers/Overlays.controller.js");

    var router = require("express").Router();
  
    // Retrieve all Intervals
    //Syntax: http://localhost:3000/intervals
    router.get("/Intervals", overlays.findAllIntervals);
    // Retrieve all Overlays present at a particular interval
    //Syntax: http://localhost:3000/overlays?interval=intervalId 
    router.get("/Overlays", overlays.findOverlays);
  
    app.use('/', router);
  };