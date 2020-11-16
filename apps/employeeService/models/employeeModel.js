const {
    dataStorageClient,
    dataMapClient
} = require('../../../db')

// const { promisify } = require("util")
// const getAsync = promisify(dataStorageClient.hgetall).bind(dataStorageClient)
// getAsync(id).then(res => {results.push(res)}).catch(err => {console.log("error");})

const getAllEmployees = () => {

    return new Promise((resolve, reject) => {

        try {
            dataStorageClient.keys("*", (err, obj) => {
                if (err) {
                    reject(err)
                } else {
                    if (!obj) {
                        reject("Employee not found.")
                    } else {
                        var promises = []
                        var results = []
                        obj.forEach(id => {
                            promises.push(
                                getEmployeeById(id.split(":")[1]).then(res => {
                                    results.push(JSON.parse(res))
                                }).catch(err => {
                                    console.log("error" + err)
                                }))
                        })
                        Promise.all(promises).then(() => {
                            // console.log(results);
                            resolve(results)
                        })
                    }
                }
            })
        } catch (error) {
            reject("database error!")
        }
    })
}

const getEmployeeById = (id) => {

    return new Promise((resolve, reject) => {

        try {
            dataStorageClient.exists("id:" + id, (err, ok) => {
                if (ok !== 1) {
                    reject("User not Found.")
                } else {
                    dataStorageClient.hgetall("id:" + id, (err, obj) => {

                        if (err) {
                            reject(err)
                        } else {
                            if (!obj) {
                                reject("User not found.")
                            } else {
                                obj.id = id
                                resolve(JSON.stringify(obj))
                            }
                        }
                    })
                }
            })
        } catch (error) {
            reject("database error!")
        }
    })

}

const createEmployee = (user) => {

    return new Promise((resolve, reject) => {

        try {
            dataStorageClient.exists("id:" + user.id, (err, ok) => {
                if (ok !== 1) {
                    const dataStorageRes = dataStorageClient.hmset("id:" + user.id, [
                        'id', user.id,
                        'data:', user.data
                    ])
                    const dataMapRes = dataMapClient.hmset("id:" + user.id, [
                        'id', user.id,
                        'parent', user.parent
                    ])
                    //(dataStorageRes && dataMapRes) ? resolve(dataStorageRes && dataMapRes) : reject(dataStorageRes && dataMapRes)
                    if (dataStorageRes) {
                        if (dataMapRes) {
                            resolve(dataStorageRes && dataMapRes)
                        } else {
                            reject("Parent data for this id not inserted.")
                        }
                    } else {
                        reject("Data for this id not inserted.")
                    }
                } else {
                    reject("This id already exist.")
                }

            })
        } catch (error) {
            reject("database error!")
        }
    })
}

const updateEmployee = (id, user) => {

    return new Promise((resolve, reject) => {

        try {
            dataStorageClient.exists("id:" + id, (err, ok) => {
                if (ok === 1) {
                    const dataStorageRes = dataStorageClient.hmset("id:" + user.id, [
                        'id', user.id,
                        'data:', user.data
                    ])
                    const dataMapRes = dataMapClient.hmset("id:" + user.id, [
                        'id', user.id,
                        'parent', user.parent
                    ])
                    dataStorageClient.del("id:" + id)
                    dataMapClient.del("id:" + id)
                    //(dataStorageRes && dataMapRes) ? resolve(dataStorageRes && dataMapRes) : reject(dataStorageRes && dataMapRes)
                    if (dataStorageRes) {
                        if (dataMapRes) {
                            resolve(dataStorageRes && dataMapRes)
                        } else {
                            reject("Parent data for this id not inserted.")
                        }
                    } else {
                        reject("Data for this id not inserted.")
                    }
                } else {
                    reject("This id does not exsist.")
                }

            })
        } catch (error) {
            reject("database error!")
        }
    })
}

const deleteEmployee = (id) => {

    return new Promise((resolve, reject) => {

        try {
            dataStorageClient.exists("id:" + id, (err, ok) => {
                if (ok !== 1) {
                    reject("User not Found.")
                } else {
                    dataStorageClient.del("id:" + id, (err, obj) => {
                        dataMapClient.del("id:" + id)
                        if (err) {
                            reject(err)
                        } else {

                            resolve(`This id (${id}) is deleted.`)

                        }
                    })
                }
            })
        } catch (error) {
            reject("database error!")
        }
    })
}

module.exports = {
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployees
}