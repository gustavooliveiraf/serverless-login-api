require('dotenv').config({ path: process.env.NODE_ENV || '.env' });

module.exports = {
  secret: process.env.SECRET,
  port: process.env.PORT,
  bucketName: process.env.BUCKET_NAME,
  bucketApi: process.env.BUCKET_API,
  envDevelopment: !process.env.PRODUCTION,
  guidTest: process.env.GUID_TEST,
  tokenTest: process.env.TOKEN_TEST,
  keyMaps: process.env.KEY_MAPS,
  linkDomMaps: process.env.LINK_DOM_MAPS,
  linkApiMaps: process.env.LINK_API_MAPS,
  linkMaps: (cep) => `${process.env.LINK_DOM_MAPS}${process.env.LINK_API_MAPS}?address=${cep}&key=${process.env.KEY_MAPS}`
};
