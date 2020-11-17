const employees = require('../models/employeeModel')
const {
    error,
    errorNotFound,
    errorServerInternal,
    ok,
    created
} = require('../../../responses/response')

class EmployeeController {

    constructor() {
        this.id = ""
        this.data = ""
        this.parent = ""
    }

    // GET dataService/getAllEmployees
    getAllEmployees = async (request, response) => {

        employees.getAllEmployees().then((result) => {

            const responseBody = {
                status: 'Ok',
                message: 'Here is ur requested data:',
                result
            }
            ok(response, responseBody)
        }, (err) => {

            const responseBody = {
                status: 'Not Found',
                message: 'Employee not found.'
            }
            error(response, responseBody)
        }).catch((err) => {

            console.log(err);
            const responseBody = {
                status: 'Not Found',
                message: ((err) ? err : 'Employee not found.')
            }
            errorNotFound(response, responseBody)
        })
    }

    // GET /dataService:id
    getEmployee = async (request, response) => {

        const param = request.param

        employees.getEmployeeById(param.id).then((result) => {

            result = JSON.parse(result)
            const responseBody = {
                status: 'Ok',
                message: 'Here is ur requested data:',
                result
            }
            ok(response, responseBody)
        }).catch((err) => {
            const responseBody = {
                status: 'Not Found',
                message: ((err) ? err : 'Employee not found.')
            }
            errorNotFound(response, responseBody)
        })
    }

    // POST /dataService
    createEmployee = async (request, response) => {

        const body = request.data

        body.then((result) => {

                const isValid = request.isValid
                const validationError = request.validationError
                const resBody = JSON.parse(result)

                if (isValid) {
                    const user = {
                        id: resBody.id,
                        data: JSON.stringify(resBody.data),
                        parent: resBody.parent,
                    }
                    employees.createEmployee(user).then((result) => {

                        const responseBody = {
                            status: 'Ok',
                            message: 'New employee added.',
                            id: user.id
                        }
                        created(response, responseBody)
                    }).catch((err) => {

                        const responseBody = {
                            status: 'Not Inserted',
                            message: (err) ? err : 'Employee not inserted.'
                        }
                        error(response, responseBody)
                    })
                } else {
                    error(response, validationError)
                }
            }, (err) => {
                errorServerInternal(response, err)
            })
            .catch(err => {
                errorServerInternal(response, err)
            })
    }

    // PUT /dataService:id
    updateEmployee = async (request, response) => {

        const param = request.param
        const body = request.data

        body.then(result => {
                const isValid = request.isValid
                const validationError = request.validationError
                const resBody = JSON.parse(result)

                if (isValid) {
                    const user = {
                        id: resBody.id,
                        data: JSON.stringify(resBody.data),
                        parent: resBody.parent,
                    }
                    employees.updateEmployee(param.id, user).then((result) => {

                        const responseBody = {
                            status: 'Ok',
                            message: 'Employee`s data updated.',
                            id: user.id
                        }
                        created(response, responseBody)
                    }).catch((err) => {

                        const responseBody = {
                            status: 'Not Updated',
                            message: (err) ? err : 'Employee`s data not updated.'
                        }
                        error(response, responseBody)
                    })
                } else {
                    error(response, validationError)
                }
            }, (err) => {
                errorServerInternal(response, err)
            })
            .catch(err => {
                errorServerInternal(response, err)
            })
    }

    // DELETE /dataService:id
    deleteEmployee = async (request, response) => {

        const param = request.param

        employees.deleteEmployee(param.id).then((result) => {

            const responseBody = {
                status: 'Ok',
                message: 'Employee deleted.',
                result: result
            }
            ok(response, responseBody)
        }).catch((err) => {

            console.log(err);
            const responseBody = {
                status: 'Not Found',
                message: ((err) ? err : 'Employee not found.')
            }
            errorNotFound(response, responseBody)
        })
    }
}
module.exports = new EmployeeController()