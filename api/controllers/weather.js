const async = require('async');
const WeatherService = require('../../services/weather');
const UtilService = require('../../services/util');

const WeatherApi = {
  current: (req, res) => {
    return async.waterfall(
      [
        (next) => {
          return UtilService.geocode(req, (err, geodata) => {
            if (err) {
              return next(err);
            }

            return next(null, geodata);
          });
        },
        (geodata, next) => {
          return WeatherService.getCurrent(
            {
              coord: geodata.ll,
              city: geodata.country,
              country: geodata.city,
            },
            (err, weather) => {
              if (err) {
                return next(err);
              }

              return next(null, weather);
            },
          );
        },
      ],
      (err, weather) => {
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
      },
    );
  },
};

module.exports = WeatherApi;
