const [username, password, database, host, port, dialect] = [
  process.env.DBUSERNAME,
  process.env.DBPASSWROD,
  process.env.DBDATABASE,
  process.env.DBHOST,
  process.env.DBPORT,
  process.env.DBDIALECT
]

module.exports = { // apply dotenv
  test: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    logging: false
  },
  testCloud: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    logging: false
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    logging: false
  }
}
