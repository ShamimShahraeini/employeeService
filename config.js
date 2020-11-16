const serverRequirement = {
    hostname: 'localhost',
    port: 8080
  }

  const databaseRequirement = {
    hostname: 'localhost',
    port: 6379, 
    database: 'mu_local_redis_db',
    password: "132940547681",
    username: "ShamimShahraeini",
    ssl: true
  }
  
  const appsDirectory = './apps'
  
  module.exports = {
    serverRequirement: serverRequirement,
    databaseRequirement: databaseRequirement,
    appsDirectory: appsDirectory
  }