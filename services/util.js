const requestIp = require('request-ip');
const async = require('async');
const geoip = require('geoip-lite');

const UtilService = {
  geocode: function (req, callback) {
    const ip = requestIp.getClientIp(req);

    let geodata = null;

    return async.series(
      [
        (next) => {
          if (!ip) {
            return next('No IP specified');
          }

          const geo = geoip.lookup(ip);

          if (!geo) {
            return next('Unable to determine your location. Sorry..');
          }

          geodata = geo;

          return next();
        },
      ],
      (err) => {
        if (err) {
          return callback(err);
        }

        return callback(null, geodata);
      },
    );
  },
};

module.exports = UtilService;
