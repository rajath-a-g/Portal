const {overlayModel, topologyModel} = require('../db/Model');
// Retrieve all Overlay information from the database, given interval 
exports.findTopology = (req, res) => {
    
    const overlayId = req.query.overlayid;
    const intervalId = parseFloat(req.query.interval);

    topologyModel.find({"Topology.Overlays.OverlayId":overlayId,"_id":intervalId})
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