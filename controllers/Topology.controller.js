const {overlayModel, topologyModel} = require('../db/Model');
// Retrieve all Overlay information from the database, given interval 
exports.findTopology = (req, res, dbInstance) => {
    
    const overlayId = req.query.overlayid;
    const intervalId = parseFloat(req.query.interval);

    dbInstance.getTopology(topologyModel, intervalId, overlayId)
      .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};