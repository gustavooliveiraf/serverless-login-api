const aws = require('aws-sdk');

aws.config.setPromisesDependency();

// const dynamoDb = new aws.DynamoDB.DocumentClient();
const dynamoDb = new aws.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

module.exports = dynamoDb;
