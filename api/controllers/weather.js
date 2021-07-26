const async = require('async');
const WeatherService = require('../../services/weather');
const UtilService = require('../../services/util');

const WeatherApi = {
  current: function (req, res) {
    return async.waterfall(
      [
        function (next) {
          return UtilService.geocode(req, function (err, geodata) {
            if (err) {
              return next(err);
            }

            return next(null, geodata);
          });
        },
        function (geodata, next) {
          return WeatherService.getCurrent(
            {
              coord: geodata.ll,
              city: geodata.country,
              country: geodata.city,
            },
            function (err, weather) {
              if (err) {
                return next(err);
              }

              return next(null, weather);
            }
          );
        },
      ],
      function (err, weather) {
        if (err) {
          return res.json({
            success: false,
            message: err,
          });
        }
        return res.json({
          success: true,
          weather: weather,
        });
      }
    );
  },
};

module.exports = WeatherApi;
