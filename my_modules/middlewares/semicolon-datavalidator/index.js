const AJV = require('ajv')
const ajv = new AJV({ allErrors: true })

// adding isValid and validationError to req
function dataValidation(schema) {
    // here, schema is the configuration
    return function validateData(req, res, next) {
        req.data.then((data) => {
            const valid = ajv.validate(schema, JSON.parse(data))
            const validationError = ajv.errors
            req.isValid = valid
            req.validationError = validationError
        })

        next()
    }
}

module.exports = dataValidation