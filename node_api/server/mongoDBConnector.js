const MongoClient = require('mongodb').MongoClient;
const logging = require('../util/logging');
const DB_NAME = "node_api";

// Tries to create a connection with the local mongo DB server
function createConnection() {
    MongoClient.connect('mongodb://127.0.0.1:27017/'+DB_NAME, (err, database) => {
        if(!err){
            logging.log("Successfully created connection to MongoDB!");
            return true;
        }else{
            logging.error("Error while creating connection to MongoDB!");
            logging.error(err);
            return false;
        }
    })
}

module.exports = {
    createConnection: createConnection
}