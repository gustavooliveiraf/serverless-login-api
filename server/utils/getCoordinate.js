var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAi6rkelBuQ3rDL6KJi2MnnUc3jZQMYYvo',
  Promise: Promise
})

const getCoordinate = async (ctx, next) => {
  try {
    const response = await googleMapsClient.geocode({
      address: ctx.payload.user.cep
    }).asPromise()

    const coordinate = [response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng]
    ctx.payload.user.coordinate = coordinate
    next()
  } catch (err) {
    console.log(err)
  }
}

module.exports = getCoordinate
