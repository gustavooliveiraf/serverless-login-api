const fetch = require('node-fetch')
const { errors } = require('server/utils')
const { keyMaps } = require('config')

const getCoordinate = async (ctx, next) => {
  try {
    const response = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${ctx.payload.user.cep}&key=${keyMaps}`)).json()

    if (!response || response.results.length === 0) { // Revisar design
      throw new Error('CEP inválido.')
    }

    ctx.payload.user.lat = response.results[0].geometry.location.lat
    ctx.payload.user.lng = response.results[0].geometry.location.lng

    return await next({ lat: ctx.payload.user.lat, lng: ctx.payload.user.lng })
  } catch (err) {
    return errors.badData(ctx, err)
  }
}

module.exports = getCoordinate
