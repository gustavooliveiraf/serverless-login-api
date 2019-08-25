module.exports = { // apply dotenv
  test: {
    username: 'postgres',
    password: '123456',
    database: 'developmentConcrete',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  homologation: {
    username: 'root',
    password: 'casa1234',
    database: 'catalogoHomologation',
    host: 'catalogo.cf2upeoc5dph.us-east-1.rds.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'root',
    password: 'casa1234',
    database: 'catalogo',
    host: 'catalogo.cf2upeoc5dph.us-east-1.rds.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    logging: false
  }
}
