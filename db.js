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
        console.log({
            options
        })
        if (options.error && options.error.code === "ECONNREFUSED") {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error("The server refused the connection");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error("Retry time exhausted");
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
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