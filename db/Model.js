const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose')

const overlaySchema = new mongoose.Schema({
    _id: Number,
    Overlay: {
        NumNodes:Number,
        NumEdges:Number
    }
}, { _id: false })

var edgeSchema = new mongoose.Schema({
    EdgeId: String,
    PeerId: String,
    CreatedTime:Decimal128,
    ConnectedTime:Decimal128,
    State:String,
    Type:String,
    TapName:String,
    MAC:String
}, { _id: false });

var nodeSchema = new mongoose.Schema({
    NodeId: String,
    NodeName:String,
    Version: String,
    Edges:[edgeSchema]
}, { _id: false });

var internalOverlaySchema = new mongoose.Schema({
    OverlayId:String,
    Nodes:[nodeSchema]
}, { _id: false })

const topologySchema = new mongoose.Schema({
    _id:Number,
    Overlays:[internalOverlaySchema]
}, { _id: false })



var overlayModel = mongoose.model('overlayData', overlaySchema, "Overlays");
var topologyModel = mongoose.model('topologyData', topologySchema, "Topology");

module.exports = {overlayModel, topologyModel};