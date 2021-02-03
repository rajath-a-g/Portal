const mongoose = require('mongoose')
const Model = require('./Model')
const {DataBaseInterface} = require('./DatabaseInterface');
const mongo = require('mongodb');
const {overlayModel, topologyModel} = require('./Model');
const {DataTransformer} = require('../controllers/DataTransformer')

class MongoDBImpl extends DataBaseInterface {
    constructor(url, dbname) {
        super(url);
        this.connection = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        this.dbname = dbname;
    }

    async insertInto(data, timestamp) {
        //console.log(data);
        var dataTrasformer = new DataTransformer();
        var transformedData = dataTrasformer.transformData(data);
        var overlaySaveData = new overlayModel({
            _id:timestamp,
            Overlays:transformedData[0]
        });
        overlaySaveData.save(function (err) {
            if (err) { console.log(err.stack); }
            console.log("Saved data");
        });
        var topoSaveData = new topologyModel({
            _id:timestamp,
            Topology: transformedData[1]
        })
        topoSaveData.save(function (err) {
            if (err) { console.log(err.stack); }
            console.log("Saved data");
        });
    }

    async getIntervals(tableName) {
        return tableName.find({},{"Overlays":0});
    }

    async getOverlays(tableName, intervalId) {
        return tableName.find({_id:intervalId});
    }

    async getTopology(tableName, intervalId, overlayId) {
        return tableName.find({"Topology.OverlayId":overlayId,"_id":intervalId});
    }
}

module.exports = { MongoDBImpl }