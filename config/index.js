require('dotenv').config({ path: process.argv[2] || '.env' })

module.exports = {
  secret: process.env.SECRET,
  port: process.env.PORT,
  bucketName: process.env.BUCKET_NAME,
  bucketApi: process.env.BUCKET_API,
  envDevelopment: process.env.NODE_ENV === 'test' ? true : false,
  keyMaps: process.env.KEY_MAPS,
  guidTest: process.env.GUID_TEST,
  tokenTest: process.env.TOKEN_TEST,
}
