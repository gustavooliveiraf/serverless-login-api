module.exports = {
  secret: process.env.SECRET,
  port: process.env.PORT,
  envDevelopment: process.env.NODE_ENV === 'development' ? true : false
}
