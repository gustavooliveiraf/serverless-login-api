const [username, password, database, host, port, dialect] = [
  process.env.DBUSERNAME,
  process.env.DBPASSWROD,
  process.env.DBDATABASE,
  process.env.DBHOST,
  process.env.DBPORT,
  process.env.DBDIALECT,
];

module.exports = {
  username,
  password,
  database,
  host,
  port,
  dialect,
  logging: false,
};
