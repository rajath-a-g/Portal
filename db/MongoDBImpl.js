const mongoose = require('mongoose')
const Model = require('./Model')
const {DataBaseInterface} = require('./DatabaseInterface');
const mongo = require('mongodb');
const {overlayModel, topologyModel} = require('./Model');

class MongoDBImpl extends DataBaseInterface {
    constructor(url, dbname) {
        super(url);
        this.connection = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        this.dbname = dbname;
    }

    async insertInto(data, timestamp) {
        console.log(data);
        var nodeSet = new Set();
        var edgeSet = new Set();
        var topoData = [];
        var overlaysArray = [];
        for (var timeStampId in data) {
            var visData = data[timeStampId]['VizData'];
            for (var overlayId in visData) {
                console.log("Here")
                var overlayData = {}
                overlayData['OverlayId'] = overlayId;
                var linkManagerData = visData[overlayId]['LinkManager'];
                var topologyData = visData[overlayId]['Topology'];
                var nodeObject = {
                    NodeId:data[timeStampId]['NodeName'],
                    NodeName:data[timeStampId]['NodeName'],
                    Version:data[timeStampId]['Version']
                };
                var nodesArray = [];
                for (var nodeId in linkManagerData) {
                    nodeSet.add(nodeId);
                    var edgesArray = [];
                    var edgeData = linkManagerData[nodeId]
                    for (var edgeId in edgeData) {
                        edgeSet.add(edgeId);
                        var edgeObject = {
                            EdgeId:edgeId,
                            PeerId:topologyData[edgeId]['PeerId'],
                            CreatedTime:topologyData[edgeId]['CreatedTime'],
                            ConnectedTime:topologyData[edgeId]['ConnectedTime'],
                            State:topologyData[edgeId]['ConnectedTime'],
                            Type:topologyData[edgeId]['Type'],
                            TapName:linkManagerData[nodeId][edgeId]['TapName'],
                            MAC:linkManagerData[nodeId][edgeId]['MAC']
                        }
                        console.log(edgeObject);
                        edgesArray.push(edgeObject);
                    }
                    nodeObject['Edges'] = edgesArray; 
                    nodesArray.push(nodeObject);
                }
                overlayData['Nodes'] = nodesArray;
                console.log(overlayData);
                overlaysArray.push(overlayData);
            }    
        }
        var overlaySaveData = new overlayModel({
            _id:timestamp,
            Overlay: {
                NumNodes:nodeSet.size,
                NumEdges:edgeSet.size
            }
        });
        overlaySaveData.save(function (err) {
            if (err) { console.log(err.stack); }
            console.log("Saved data");
        });
        var topoSaveData = new topologyModel({
            _id:timestamp,
            Overlays: overlaysArray
        })
        topoSaveData.save(function (err) {
            if (err) { console.log(err.stack); }
            console.log("Saved data");
        });
    }
}

module.exports = { MongoDBImpl }