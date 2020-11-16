const url = require('url')

// adding param(query of request) and data(content of post and put request) to req
function dataPreparation(req, res, next) {
    let param = null
    let data = null

    if (req.method === 'POST' || req.method === 'PUT') {
        data = getData(req)

    }
    param = getParam(req)
    req.param = param
    req.data = data

    next()
}


function getParam(req) {
    return url.parse(req.url, true).query
}

function getData(req) {
    return new Promise((resolve, reject) => {
        try {
            let data = ''
            req.on('data', chunk => {
                data += chunk.toString() // convert Buffer to string
            });
            req.on('end', () => {
                //resolve(parse(data))
                resolve(data)
            });
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = dataPreparation