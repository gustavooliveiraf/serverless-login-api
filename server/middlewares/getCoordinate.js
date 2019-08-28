const nock = require('nock');
const fetch = require('node-fetch');
const { errors } = require('server/utils');
const { linkMaps } = require('config');

const getCoordinate = async (ctx, next) => {
  try {
    nock.cleanAll(); // verify

    const response = await (await fetch(linkMaps(ctx.payload.user.cep))).json();

    if (response && response.results.length > 0) {
      ctx.payload.user.lat = response.results[0].geometry.location.lat;
      ctx.payload.user.lng = response.results[0].geometry.location.lng;

      return await next({ lat: ctx.payload.user.lat, lng: ctx.payload.user.lng });
    }

    throw new Error('CEP inválido.');
  } catch (err) {
    return errors.badData(ctx, err);
  }
};

module.exports = getCoordinate;
