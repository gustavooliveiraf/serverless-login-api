const fetch = require('node-fetch')
const { errors } = require('server/utils')
const { keyMaps } = require('config')

const getCoordinate = async (ctx, next) => {
  try {
    const response = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=50070-440&key=${keyMaps}`)).json()
    console.log(ctx.payload.user.cep)
    console.log(`---------`)
    console.log(keyMaps)
    console.log(`---------`)
    console.log(response)

    if (!response || response.json.results.length === 0) { // Revisar design
      throw new Error('CEP inválido.')
    }

    ctx.payload.user.lat = response.json.results[0].geometry.location.lat
    ctx.payload.user.lng = response.json.results[0].geometry.location.lng

    await next()
  } catch (err) {
    return errors.badData(ctx, err)
  }
}

module.exports = getCoordinate
