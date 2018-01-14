const MongoClient = require('mongodb').MongoClient;
const logging = require('../util/logging');
const DB_NAME = "node_api";

/* Private Functions */
// Tries to create a connection with the local MongoDB server
function createMongoDBConnection(resolve, reject){
    MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
        if(!err){
            logging.log("Successfully created connection to MongoDB!");
            resolve(client.db(DB_NAME));
        }else{
            logging.error("Error while creating connection to MongoDB!");
            logging.error(err);
            resolve(false);
        }
    })
}

/* Public Functions */
// Returns a promise
function createConnection() {
    return new Promise(createMongoDBConnection);
}

module.exports = {
    createConnection: createConnection
}