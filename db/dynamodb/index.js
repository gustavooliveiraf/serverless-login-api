const aws = require('aws-sdk');

aws.config.setPromisesDependency();

const dynamoDb = new aws.DynamoDB.DocumentClient({
  endpoint: process.env.IS_OFFLINE ? 'http://localhost:8000' : undefined,
});

module.exports = dynamoDb;
