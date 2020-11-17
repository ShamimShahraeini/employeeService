const redis = require('redis')
const {
    databaseRequirement
} = require('./config')

// Connect to our Databases
const dataStorageClient = redis.createClient({
    port: databaseRequirement.port,
    host: databaseRequirement.hostname,
    db: 1,
    retry_strategy: function (options) {
        
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    },
})
dataStorageClient.on("error", function (error) {
    console.error(error);
})
dataStorageClient.on('connect', function () {
    console.log(`Database connected at http://${databaseRequirement.hostname}:${databaseRequirement.port}/db=dataStorage`);
})
const dataMapClient = redis.createClient({
    port: databaseRequirement.port,
    host: databaseRequirement.hostname,
    db: 2,
    retry_strategy: function (options) {
        
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    },
})
dataMapClient.on("error", function (error) {
    console.error(error);
})
dataMapClient.on('connect', function () {
    console.log(`Database connected at http://${databaseRequirement.hostname}:${databaseRequirement.port}/db=dataMap`);
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
})
module.exports = {
    dataStorageClient,
    dataMapClient
}