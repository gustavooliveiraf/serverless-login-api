const nock = require('nock');
const fetch = require('node-fetch');
const { errors } = require('../utils');
const { linkMaps } = require('../../config');

const getCoordinate = async (req, res, next) => {
  try {
    nock.cleanAll(); // verify

    const response = await (await fetch(linkMaps(req.payload.user.cep))).json();

    if (response && response.results.length > 0) {
      req.payload.user.lat = response.results[0].geometry.location.lat;
      req.payload.user.lng = response.results[0].geometry.location.lng;

      return next();
    }

    throw new Error('CEP inválido.');
  } catch (err) {
    return errors.badData(res, err);
  }
};

module.exports = getCoordinate;
