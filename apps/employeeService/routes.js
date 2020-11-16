const employeeController = require('./controllers/employeeController')

const dataPreparation = require('semicolon-datapreparator')

const createEmployeeSchema = require('./schemas/signupSchema')
const dataValidation = require('semicolon-datavalidator')

const employeeSignupValidation = dataValidation(createEmployeeSchema)

const requestLog = require('semicolon-requestlogger')
const contentRequestLog = requestLog('./consol.log')

module.exports = [
    
    {
        url: '/dataService/getAllEmployees',
        method: 'GET',
        handler: employeeController.getAllEmployees,
        middlewares: [dataPreparation, contentRequestLog]
    },
    {
        url: '/dataService',
        method: 'GET',
        handler: employeeController.getEmployee,
        middlewares: [dataPreparation, contentRequestLog]
    },
    {
        url: '/dataService',
        method: 'POST',
        handler: employeeController.createEmployee,
        middlewares: [dataPreparation, employeeSignupValidation, contentRequestLog]
    },
    {
        url: '/dataService',
        method: 'PUT',
        handler: employeeController.updateEmployee,
        middlewares: [dataPreparation, employeeSignupValidation, contentRequestLog]
    },
    {
        url: '/dataService',
        method: 'DELETE',
        handler: employeeController.deleteEmployee,
        middlewares: [dataPreparation, contentRequestLog]
    }
]