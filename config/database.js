module.exports = {
  development: {
    username: "postgres",
    password: "123456",
    database: "developmentConcrete2",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  homologation: {
    username: "postgres",
    password: "123456",
    database: "homologationConcrete",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: "123456",
    database: "productionConcrete2",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  }
}
