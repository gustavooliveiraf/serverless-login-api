const { errors } = require('server/utils')

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAi6rkelBuQ3rDL6KJi2MnnUc3jZQMYYvo',
  Promise: Promise
})

const getCoordinate = async (ctx, next) => {
  try {
    const response = await googleMapsClient.geocode({
      address: ctx.payload.user.cep
    }).asPromise()

    if (!response || response.json.results.length === 0) {
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
