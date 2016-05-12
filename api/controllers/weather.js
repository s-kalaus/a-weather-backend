'use strict';

var async = require('async');
var WeatherService = require('../../services/weather');
var UtilService = require('../../services/util');

var WeatherApi = {

    current: function(req, res) {

        return async.waterfall([
            function(next) {

                return UtilService.geocode(req, function(err, geodata) {

                    if (err) {
                        return next(err);
                    }

                    return next(null, geodata);
                });
            },
            function(geodata, next) {

                return WeatherService.getCurrent({
                    coord: geodata.ll,
                    city: geodata.country,
                    country: geodata.city
                }, function(err, weather) {

                    if (err) {
                        return next(err);
                    }

                    return next(null, weather);
                });
            }
        ], function(err, weather) {

            if (err) {

                return res.json({
                    success: false,
                    message: err
                });
            }

            return res.json({
                success: true,
                weather: weather
            });
        });
    }
};

module.exports = WeatherApi;