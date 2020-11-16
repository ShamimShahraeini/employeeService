const fs = require('fs')

function requestLogger(file) {

    return function logRequest(req, res, next) {
        const { httpVersion, method, socket, url } = req
        const { remoteAddress, remoteFamily } = socket

        // TODO : add users ip
        let data = JSON.stringify({ timestamp: Date.now(), httpVersion, method, route: url, remoteAddress, remoteFamily })
        fs.appendFile(file, data + '\r\n', (err) => {
            if (err) {
                // console.log(err)
                // error(res, err)
                next()
            }
            else {
                // console.log("File written successfully\n")
                next()
            }
        })
    }

}

module.exports = requestLogger