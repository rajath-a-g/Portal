const {overlayModel, topologyModel} = require('../db/Model');
//const MongoDBImpl = require('../db/MongoDBImpl')

// Retrieve all Intervals from the database.
exports.findAllIntervals = (req, res, dbInstance) => {
  
    dbInstance.getIntervals(overlayModel)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving intervals."
        });
      });
};

// Retrieve all Overlays present at a particular interval
exports.findOverlays = (req, res, dbInstance) => {

    const intervalId = parseFloat(req.query.interval);
   
    dbInstance.getOverlays(overlayModel, intervalId)
    .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving overlays."
        });
      });
};
