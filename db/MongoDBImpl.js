const {DataBaseInterface} = require('./DatabaseInterface');
const mongo = require('mongodb');

class MongoDBImpl extends DataBaseInterface {
    constructor(url, dbname) {
        super(url);
        this.client = new mongo.MongoClient(url);
        this.dbname = dbname;
    }

    async insertInto(tableName, data) {
        await this.client.connect()
        await this.client.db(this.dbname).collection(tableName).insertOne(data);
    }
}

module.exports = { MongoDBImpl }