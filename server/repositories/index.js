let userRepository;

if (process.env.DB === 'RDS') userRepository = require('./rds/user');
else if (process.env.DB === 'DYNAMODB') userRepository = require('./dynamodb/user');

module.exports = userRepository;
