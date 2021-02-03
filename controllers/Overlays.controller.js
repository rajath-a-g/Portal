const {overlayModel, topologyModel} = require('../db/Model');

// Retrieve all Intervals from the database.
exports.findAllIntervals = (req, res) => {

    overlayModel.find({},{"Overlays":0})
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
exports.findOverlays = (req,res) => {

    const intervalId = parseFloat(req.query.interval);
    //console.log(intervalId);
    overlayModel.find({_id:intervalId})
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
