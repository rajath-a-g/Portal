const DataBaseInterface = require('./DatabaseInterface');
const mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

export class MongoDBImpl extends DataBaseInterface {
    constructor(url, dbname) {
        super(url);
        this.dbname = dbname;
        MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            this.db = db;
        });
    }
    
    insertInto(tableName, data) {
        var dbObject = this.db.db(this.dbname)
        dbObject.collection(tableName).insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("Added data into the Mongo DB");
        })
    }
}