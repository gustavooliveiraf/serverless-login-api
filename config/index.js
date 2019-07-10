module.exports = {
  secret: process.env.SECRET,
  port: process.env.PORT,
  bucketName: process.env.BUCKET_NAME,
  bucketApi: process.env.BUCKET_API,
  envDevelopment: process.env.NODE_ENV === 'development' ? true : false
}
