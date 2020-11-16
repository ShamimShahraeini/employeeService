const http = require('http')

class Server {
    // class methods
    constructor(serverRequirement, eventEmitter) {
        // each server should contain some config informations and emitter to say it's requests
        this.hostname = serverRequirement.hostname
        this.port = serverRequirement.port
        this.serverEventEmitter = eventEmitter
    }

    start() {
        // by statrting a server, a new http server creates and starts running
        http.createServer((req, res) => {
            this.serverEventEmitter.emit('routerReq', req, res)
        }).listen(this.port, this.hostname, () => {
            console.log(`Server is running at http://${this.hostname}:${this.port}/`)
        })
    }

}

module.exports = Server