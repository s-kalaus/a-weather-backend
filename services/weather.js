const config = require('../config');
const openweathermap = require('openweathermap');

openweathermap.defaults({
  units: 'metric',
  lang: 'en',
  mode: 'json',
  appid: config.openweathermap.appid,
});

var WeatherService = {
  getCurrent: function (params, callback) {
    const q = {};

    if (params.coord) {
      q.lat = params.coord[0];
      q.lon = params.coord[1];
    } else if (params.city) {
      const place = [params.city];
      if (params.county) {
        place.push(params.county);
      }
      q.q = place.join(',');
    } else {
      return callback('Invalid params');
    }

    return openweathermap.now(q, function (err, weather) {
      if (err) {
        return callback(JSON.stringify(err));
      }
      return callback(null, weather);
    });
  },
};

module.exports = WeatherService;
