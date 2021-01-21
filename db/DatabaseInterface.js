
class DataBaseInterface {
    constructor(url) {
        this.url = url;
    }

    insertInto(tableName, data) {
        console.log("insertInto method not implemented by specific db");
    }

    getData(tableName, intervalNumber) {
        console.log("getData method not implemented by specific db");
    }

    close() {
        console.log("close method not implemented by specific db");
    }
}

module.exports = { DataBaseInterface }